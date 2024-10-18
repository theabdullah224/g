# Import necessary modules from Flask framework and other libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import bcrypt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import base64
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta  # Added import
from models import db, User, initialize_database
import openai
import stripe
from flask import Flask
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from models import db, User
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import stripe
import random
import random
import string
from datetime import datetime, timedelta
from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import logging
import bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Blueprint, jsonify, request
from models import User, db
from datetime import timedelta
from datetime import datetime, timezone
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
# Load environment variables from a .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
stripe.api_key = os.getenv('STRIPEAPIKEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWTSECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30) 
jwt = JWTManager(app)
# Enable Cross-Origin Resource Sharing (CORS) to allow requests from any origin
# CORS(app, resources={r"/": {"origins": "*"}})
CORS(app)
api = Blueprint('api', __name__)
from flask_migrate import Migrate

# migrate = Migrate(app, db)

# Set up logging for debugging purposes
logging.basicConfig(level=logging.DEBUG)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Directly use the PostgreSQL connection string as in models.py
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_SIZE'] = 10
app.config['SQLALCHEMY_MAX_OVERFLOW'] = 20
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 30
app.config['SQLALCHEMY_POOL_RECYCLE'] = 299

app.config['SQLALCHEMY_POOL_PRE_PING'] = True
# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)

# SMTP (Email) server configuration using environment variables
SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT', 465))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')

# Set up OpenAI client with API key from environment variables
openai.api_key = os.getenv('OPENAI_API_KEY')
#Payment Route:
# Payment route
@app.route('/payment', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()
        plan_type = data.get('planType')
        email = data.get('email')

        logging.info(f"Creating payment for plan: {plan_type}, email: {email}")

        plan_mapping = {
            'pro': {
                'price_id': 'price_1PuTKXJIHZe9tvecdtUCk4B3',
                'amount': 699
            },
            'ultra_pro': {
                'price_id': 'price_1PuTMLJIHZe9tvecikAUEJ6W',
                'amount': 6900
            }
        }

        if plan_type not in plan_mapping:
            return jsonify({'error': 'Invalid plan type'}), 400

        price_id = plan_mapping[plan_type]['price_id']

        # Create a Checkout Session with a 30-day trial
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url='https://www.gbmeals.com/welcome',
            cancel_url='https://www.gbmeals.com/',
            subscription_data={
                'trial_period_days': 30,
            },
            customer_email=email,
        )

        logging.info(f"Payment session created: {session.id}")
        return jsonify({'url': session.url})

    except stripe.error.StripeError as e:
        logging.error(f'Stripe error: {e.user_message}')
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        logging.error(f'Error creating payment session: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500




@app.route('/cancel-plan', methods=['POST'])
def cancel_plan():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        if user.subscription_status not in ['pro', 'ultra_pro']:
            return jsonify({'error': 'No active paid subscription found for this user'}), 400

        # Find the customer in Stripe
        customers = stripe.Customer.list(email=email)
        if not customers.data:
            return jsonify({'error': 'No customer found in Stripe with this email'}), 404

        customer = customers.data[0]

        # Cancel the subscription in Stripe
        subscriptions = stripe.Subscription.list(customer=customer.id, status='active')
        if subscriptions.data:
            for subscription in subscriptions.data:
                canceled_subscription = stripe.Subscription.delete(subscription.id)
                logging.info(f"Subscription canceled: {canceled_subscription.id}")

        # Update user's subscription status in the database
        user.subscription_status = 'inactive'
        user.subscription_end_date = None
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'Subscription canceled successfully. You can now delete your card if desired.',
        })

    except stripe.error.StripeError as e:
        logging.error(f'Stripe error: {e.user_message}')
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        logging.error(f'Error canceling subscription: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/delete-card', methods=['POST'])
def delete_card():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Check if user is on a paid plan
        if user.subscription_status in ['pro', 'ultra_pro']:
            return jsonify({'error': 'Please cancel your plan before deleting the card'}), 400

        # Find the customer in Stripe
        customers = stripe.Customer.list(email=email)
        if not customers.data:
            return jsonify({'error': 'No customer found in Stripe with this email'}), 404

        customer = customers.data[0]

        # Get the last 4 digits of the card before deleting
        payment_methods = stripe.PaymentMethod.list(customer=customer.id, type="card")
        card_last4 = None
        if payment_methods.data:
            card_last4 = payment_methods.data[0].card.last4

        # Delete the payment methods (cards)
        for payment_method in payment_methods.data:
            stripe.PaymentMethod.detach(payment_method.id)

        # Update user's subscription status if they're on a free trial
        if user.subscription_status == 'trial':
            user.subscription_status = 'inactive'
            user.subscription_end_date = None
            db.session.commit()

        message = 'Card deleted successfully.'
        if card_last4:
            message += f' Card ending in {card_last4} has been removed.'

        return jsonify({
            'status': 'success',
            'message': message,
        })

    except stripe.error.StripeError as e:
        logging.error(f'Stripe error: {e.user_message}')
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        logging.error(f'Error deleting card: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/update-card', methods=['POST'])
def update_card():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Find the customer in Stripe
        customers = stripe.Customer.list(email=email)
        if not customers.data:
            return jsonify({'error': 'No customer found in Stripe with this email'}), 404

        customer = customers.data[0]

        # Check if the customer has any payment methods
        payment_methods = stripe.PaymentMethod.list(
            customer=customer.id,
            type="card"
        )

        if not payment_methods.data:
            return jsonify({'error': 'No card found. Please subscribe to a plan first.'}), 400

        # Create a new Checkout Session for updating the card
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            mode='setup',
            customer=customer.id,
            success_url='https://www.gbmeals.com/',
            cancel_url='https://www.gbmeals.com/',
        )

        return jsonify({'url': session.url})

    except stripe.error.StripeError as e:
        logging.error(f'Stripe error: {e.user_message}')
        return jsonify({'error': e.user_message}), 400
    except Exception as e:
        logging.error(f'Error updating card: {str(e)}')
        return jsonify({'error': 'Internal Server Error'}), 500


@app.route('/check-subscription', methods=['POST'])
def check_subscription():
    try:
        data = request.get_json()
        email = data.get('email')

        logger.info(f"Checking subscription for email: {email}")

        if not email:
            return jsonify({"error": "Email is required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            logger.warning(f"User not found for email: {email}")
            return jsonify({"error": "User not found"}), 404

        is_subscribed = user.is_subscription_active()
        can_generate_pdf = user.can_generate_pdf()

        logger.info(f"User details: status={user.subscription_status}, end_date={user.subscription_end_date}, free_used={user.free_plan_used}")
        logger.info(f"Subscription check result: is_subscribed={is_subscribed}, can_generate_pdf={can_generate_pdf}")

        return jsonify({
            "isSubscribed": is_subscribed,
            "canGeneratePDF": can_generate_pdf,
            "subscriptionStatus": user.subscription_status
        })

    except Exception as e:
        logger.error(f"Error checking subscription status: {str(e)}", exc_info=True)
        return jsonify({"error": "An internal server error occurred. Please try again later."}), 500
# temp route to check user details ..debugging...
@app.route('/check-user/<email>', methods=['GET'])
def check_user(email):
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({
            'email': user.email,
            'subscription_status': user.subscription_status,
            'subscription_end_date': str(user.subscription_end_date) if user.subscription_end_date else None,
            'free_plan_used': user.free_plan_used
        }), 200
    return jsonify({'error': 'User not found'}), 404


@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get('Stripe-Signature')
    endpoint_secret = os.getenv('WEBHOOKENDPOINTSECRET')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        logger.error(f'Invalid payload: {str(e)}')
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError as e:
        logger.error(f'Invalid signature: {str(e)}')
        return jsonify({'error': 'Invalid signature'}), 400

    logger.info(f"Received Stripe event: {event['type']}")
    logger.info(f"Event data: {event['data']}")

    if event['type'] == 'invoice.payment_succeeded':
        customer_id = event['data']['object']['customer']
        customer = stripe.Customer.retrieve(customer_id)
        email = customer.email

        logger.info(f"Processing payment for email: {email}")
        user = User.query.filter_by(email=email).first()
        if user:
            try:
                plan_type = event['data']['object']['lines']['data'][0]['price']['product']
                logger.info(f"Received plan type: {plan_type}")
                
                if plan_type == 'prod_Qm1NSZX9ObY4mC':  # pro plan
                    user.subscription_status = 'pro'
                elif plan_type == 'prod_Qm1PPuGYmN2DDq':  # ultra pro plan
                    user.subscription_status = 'ultra_pro'
                else:
                    user.subscription_status = 'active'
                
                user.subscription_end_date = datetime.utcnow() + timedelta(days=30)
                db.session.commit()
                logger.info(f"Updated subscription for user {email}: status={user.subscription_status}, end_date={user.subscription_end_date}")
                
                # Send Welcome Email if the user has subscribed to pro or ultra_pro
                if user.subscription_status in ['pro', 'ultra_pro']:
                    send_welcome_email(user.email, user.name, user.subscription_status)
                    logger.info(f"Welcome email sent to {user.email} for {user.subscription_status} plan")

            except Exception as e:
                db.session.rollback()
                logger.error(f"Error updating subscription: {str(e)}")
        else:
            logger.warning(f"User not found for email: {email}")

    return jsonify({'status': 'success'}), 200

# Function to send welcome email with hardcoded SMTP credentials
def send_welcome_email(email, name, plan_type):
    try:
        msg = MIMEMultipart()
        msg['From'] = 'lann8552@gmail.com'
        msg['To'] = email
        msg['Subject'] = "Welcome to GBMeals - Subscription Active!"

        # Email body content based on plan type
        body = f"""
        Hello {name},

        Welcome to GBMeals, and thank you for subscribing to our {plan_type.capitalize()} Plan!

        With your {plan_type.capitalize()} Plan, you'll have access to personalized meal plans tailored to your preferences. 
        Start planning your meals today and enjoy delicious, healthy meals made just for you.

        If you have any questions, feel free to contact our support team.

        Best regards,
        The GBMeals Team
        """

        msg.attach(MIMEText(body, 'plain'))

        # Send the email via SMTP with hardcoded credentials
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login('lann8552@gmail.com', 'gaytwyanzdxasqnl')
            server.sendmail('lann8552@gmail.com', email, msg.as_string())

        logger.info(f"Welcome email sent to {email}")

    except Exception as e:
        logger.error(f"Error sending welcome email to {email}: {str(e)}")


# pdf cout-------------------------------------------------------------
@app.route('/api/users/<int:user_id>/pdf_stats', methods=['GET'])
def get_user_pdf_stats(user_id):
    try:
        # PDFs generated in the last week
        pdf_count_last_week = get_pdf_count_last_week(user_id)
        
        # PDFs generated in the last month
        pdf_count_last_month = get_pdf_count_last_month(user_id)
        
        # PDFs generated per month in the current year
        pdf_count_per_month = get_pdf_count_per_month(user_id)
        month_stats = [
            {
                'month': month.strftime('%B %Y'),
                'pdf_count': count
            } for month, count in pdf_count_per_month
        ]
        
        # PDFs generated per year
        pdf_count_per_year = get_pdf_count_per_year(user_id)
        year_stats = [
            {
                'year': year.strftime('%Y'),
                'pdf_count': count
            } for year, count in pdf_count_per_year
        ]
        
        # Total PDFs generated by the user
        total_pdf_count = get_total_pdf_count(user_id)
        
        # Return all the data in one response
        return jsonify({
            'user_id': user_id,
            'pdf_count_last_week': pdf_count_last_week,
            'pdf_count_last_month': pdf_count_last_month,
            'pdf_count_per_month': month_stats,
            'pdf_count_per_year': year_stats,
            'total_pdf_count': total_pdf_count
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to fetch PDF stats', 'message': str(e)}), 500






@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()  # Fetch all users from the database
        users_list = []
        for user in users:
            users_list.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'subject': user.subject,
                'subscription_status': user.subscription_status,
                'subscription_end_date': user.subscription_end_date,
                'free_plan_used': user.free_plan_used,
                'verification_code': user.verification_code,
                'verification_code_expiry': user.verification_code_expiry
            })
        return jsonify(users_list), 200  # Return the list as a JSON response with HTTP 200 status
    except Exception as e:
        return jsonify({'error': 'Failed to fetch users', 'message': str(e)}), 500


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({"error": "Email is required"}), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        verification_code = ''.join(random.choices(string.digits, k=6))
        
        user.verification_code = verification_code
        user.verification_code_expiry = datetime.utcnow() + timedelta(minutes=10)
        db.session.commit()

        # Create a token that includes the user's ID
        token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))

        # Send email (implementation remains the same)
        # ...
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = "Your Password Reset Verification Code"
        body = f"Your verification code to reset your password is {verification_code}. The code will expire in 10 minutes."
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, email, msg.as_string())

        return jsonify({"message": "Verification code sent to your email", "token": token}), 200

    except Exception as e:
        logging.error(f"Error in forgot password: {str(e)}")
        return jsonify({"error": str(e)}), 500



@app.route('/verify-code', methods=['POST'])
@jwt_required()
def verify_code():
    try:
        data = request.get_json()
        verification_code = data.get('verification_code')

        if not verification_code:
            return jsonify({"error": "Verification code is required"}), 400

        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        if user.verification_code != verification_code:
            return jsonify({"error": "Invalid verification code"}), 400

        if datetime.utcnow() > user.verification_code_expiry:
            return jsonify({"error": "Verification code has expired"}), 400

        # Create a new token for password reset
        reset_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))

        return jsonify({"message": "Verification successful. You can now reset your password.", "reset_token": reset_token}), 200

    except Exception as e:
        logging.error(f"Error in verifying code: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    try:
        data = request.get_json()
        new_password = data.get('new_password')

        if not new_password:
            return jsonify({"error": "New password is required"}), 400

        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

        user.password = hashed_password.decode('utf-8')
        user.verification_code = None
        user.verification_code_expiry = None
        db.session.commit()

        return jsonify({"message": "Password updated successfully"}), 200

    except Exception as e:
        logging.error(f"Error in resetting password: {str(e)}")
        return jsonify({"error": str(e)}), 500





@app.route('/initiate-delete-account', methods=['POST'])
def initiate_delete_account():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Check if the user exists and the password is correct
        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({"error": "Invalid email or password"}), 401

        # Generate a 6-digit verification code
        verification_code = ''.join(random.choices(string.digits, k=6))

        # Set verification code and expiry time
        user.verification_code = verification_code
        user.verification_code_expiry = datetime.utcnow() + timedelta(minutes=10)
        db.session.commit()

        # Send the verification code to the user's email
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = "Account Deletion Verification Code"
        body = f"Your verification code to delete your account is {verification_code}. The code will expire in 10 minutes."
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, email, msg.as_string())

        # Generate and return a JWT token
        token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=10))
        return jsonify({"message": "Verification code sent to your email", "token": token}), 200

    except Exception as e:
        logging.error(f"Error in initiating account deletion: {str(e)}")
        return jsonify({"error": str(e)}), 500





@app.route('/confirm-delete-account', methods=['POST'])
@jwt_required()
def confirm_delete_account():
    try:
        data = request.get_json()
        verification_code = data.get('verification_code')

        if not verification_code:
            return jsonify({"error": "Verification code is required"}), 400

        # Get the user's ID from the JWT token
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Check if the verification code matches and is not expired
        if user.verification_code != verification_code:
            return jsonify({"error": "Invalid verification code"}), 400

        if datetime.utcnow() > user.verification_code_expiry:
            return jsonify({"error": "Verification code has expired"}), 400

        # Delete the user account
        db.session.delete(user)
        db.session.commit()

        # Optionally: Blacklist or revoke the current token here to prevent further use
        # e.g., adding the current JWT to a blacklist or invalidating it

        return jsonify({"message": "Account deleted successfully"}), 200

    except SQLAlchemyError as e:
        logging.error(f"Database error in confirming account deletion: {str(e)}")
        db.session.rollback()  # Rollback in case of a database error
        return jsonify({"error": "Database error occurred"}), 500
    except Exception as e:
        logging.error(f"Error in confirming account deletion: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/deleteuser/<email>', methods=['DELETE'])
def deleteuser(email):
    try:
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        logging.error('Error during user deletion: %s', str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/adduser', methods=['POST'])
def adduser():
    try:
        data = request.json
        name = data.get('Your Name')
        email = data.get('Email Address')
        password = data.get('Password')
        subscription_status = data.get('status')

        
        if not email or not password:
            return jsonify({"error": "Invalid input: Name, email, and password are required."}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User with this email already exists"}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        new_user = User(name=name, email=email, password=hashed_password.decode('utf-8'), subscription_status=subscription_status)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

    except Exception as e:
        logging.error('Error during signup: %s', str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/submit', methods=['POST'])
def submit_contact_form():
    data = request.get_json()

    # Ensure all required fields are provided
    if not data or not all(k in data for k in ("name", "email", "message")):
        return jsonify({"error": "Invalid input: 'name', 'email', and 'message' are required."}), 400

    name = data['name']
    email = data['email']
    message = data['message']

    try:
        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = "team@gbmeals.com"  # Replace with your recipient email
        msg['Subject'] = "User Contact Email"

        # Create the email body
        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, 'plain'))

        # Connect to the SMTP server and send the email
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)

        # Return a success message
        return jsonify({"message": "Your message has been sent successfully!"}), 200

    except Exception as e:
        # Log any errors and return an error message to the client
        app.logger.error('Error sending email: %s', str(e))
        return jsonify({"error": f"An error occurred while sending your message. Details: {str(e)}"}), 500


# Route to get a list of questions (currently returns an empty list)
@app.route('/questions', methods=['GET'])
def get_questions():
    questions = [
        {
            "category": "Food Allergies",
            "description": "Tell Us About Your Food Allergies",
            "details": "We want to make sure your meal plan is tailored to your needs. Let us know if you have any food allergies so we can provide you with delicious and safe recipes.",
            "options": [
                {"icon": "eggs.svg", "label": "Egg"},
                {"icon": "cheese.svg", "label": "Cheese"},
                {"icon": "tofu.svg", "label": "Tufo"},  # Note: Corrected typo from 'tufo' to 'tofu'
                {"icon": "butter.svg", "label": "Butter"},
                {"icon": "coconut.svg", "label": "Coconut"},
                {"icon": "plusc.svg", "label": "Add"}
            ]
        },
        {
            "category": "Food Dislikes",
            "description": "Tell us about the food you dislike",
            "details": "Tell us about the food you dislike",
            "options": [
                {"icon": "Chicken.svg", "label": "Chicken"},
                {"icon": "pork.svg", "label": "Pork"},
                {"icon": "beef.svg", "label": "Beef"},
                {"icon": "fish.svg", "label": "Fish"},
                {"icon": "mashroom.svg", "label": "Mushrooms"},  # Note: Corrected typo from 'mashroom' to 'mushroom'
                {"icon": "plusc.svg", "label": "Add"}
            ]
        },
        {
            "category": "Meal Plan Preferences",
            "description": "Choose Your Preferred/Popular Meal Plan",
            "details": "Select from popular dietary preferences to tailor your meal plan.",
            "options": [
                {"icon": "lowcarbs.svg", "label": "Low carb"},
                {"icon": "balanceddiet.svg", "label": "Balanced diet"},
                {"icon": "cornivorediet.svg", "label": "Carnivore diet"},  # Note: Corrected typo from 'carnivore' to 'cornivore'
                {"icon": "paleodiet.svg", "label": "Paleo diet"},
                {"icon": "plusc.svg", "label": "Add"}
            ]
        },
        {
            "category": "Dietary Restrictions",
            "description": "Choose Your Dietary Restrictions",
            "details": "Select any dietary restrictions that apply to you.",
            "options": [
                {"icon": "glotenfree.svg", "label": "Gluten free"},  # Note: Corrected typo from 'glotenfree' to 'glutenfree'
                {"icon": "diaryfree.svg", "label": "Dairy free"}   # Note: Corrected typo from 'diaryfree' to 'dairy free'
            ]
        },
        {
            "category": "Servings",
            "description": "How Many Servings Do You Need?",
            "details": "Select the number of servings you need per meal.",
            "options": [
                {"icon": "servings.svg", "label": "1 serving"},
                {"icon": "servings.svg", "label": "2 servings"},
                {"icon": "servings.svg", "label": "3 servings"},
                {"icon": "servings.svg", "label": "4+ servings"},
                {"icon": "plusc.svg", "label": "Add"}
            ]
        }
    ]

    return jsonify(questions)


# Route to test if CORS is working
@app.route('/test-cors', methods=['GET'])
def test_cors():
    response = jsonify({"message": "CORS is working"})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow any origin to access this resource
    return response

# Route to generate a meal plan based on user input
@app.route('/generate', methods=['OPTIONS', 'POST'])
def generate_meal_plan():
    if request.method == 'OPTIONS':  # Handle preflight request for CORS
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    try:
        data = request.get_json()  # Parse the JSON body of the request
        food_preferences = data.get('preferredMeal')  # User's preferred meal plan type
        allergies = data.get('allergies', [])  # Allergies to avoid
        dislikes = data.get('dislikes', [])  # Foods the user dislikes
        dietary_restrictions = data.get('dietaryRestrictions', [])  # Dietary restrictions to consider
        servings = data.get('servings')  # Number of servings per meal

        if not food_preferences or not servings:
            return jsonify({"error": "Invalid input: preferredMeal and servings are required."}), 400

        meal_plan = ""  # Initialize an empty string to store the meal plan

        if servings == "4+":
             actual_servings = 5
        else:
            actual_servings = servings


        for day in range(1, 7):
            prompt = (
        f"Create a detailed 1-day meal plan for Day {day} of a {food_preferences} diet with exactly {actual_servings} meals. "
        f"Avoid these allergies: {', '.join(allergies)}. "
        f"Exclude these disliked foods: {', '.join(dislikes)}. "
        f"Consider these dietary restrictions: {', '.join(dietary_restrictions)}. "
        f"\n\n"
        f"For each of the {actual_servings} meals, use the following exact format:\n\n"
        "Meal [number]\n"
        "Main Dish:\n"
        "[Main Dish Name]\n"
        "Side Dish:\n"
        "[Side Dish Name]\n"
        "Cooking Time:\n"
        "Prep:[prep time]\n"
        "Cook:[cook time]\n"
        "Total Time:[total time]\n"
        "Nutritional Information:\n"
        "Main Dish:\n"
        "Calories [number]\n"
        "Protein (g) [number]\n"
        "Carb (g) [number]\n"
        "Fiber (g) [number]\n"
        "Fat (g) [number]\n"
        "Side Dish:\n"
        "Calories [number]\n"
        "Protein (g) [number]\n"
        "Carb (g) [number]\n"
        "Fiber (g) [number]\n"
        "Fat (g) [number]\n"
        "Total:\n"
        "Calories [Total]\n"
        "Protein (g) [Total]\n"
        "Carb (g) [Total]\n"
        "Fiber (g) [Total]\n"
        "Fat (g) [Total]\n"

        "Ingredients:\n"
        "Main Dish:\n"
        "1. [Ingredient 1 for main dish]\n"
        "2. [Ingredient 2 for main dish]\n"
        "3. ...\n"
        "Side Dish:\n"
        "1. [Ingredient 1 for side dish]\n"
        "2. [Ingredient 2 for side dish]\n"
        "3. ...\n"
        "Instructions:\n"
        "Main Dish:\n"
        "1. [Step 1 for main dish]\n"
        "2. [Step 2 for main dish]\n"
        "3. ...\n"
        "Side Dish:\n"
        "1. [Step 1 for side dish]\n"
        "2. [Step 2 for side dish]\n"
        "3. ...\n"
        f"Repeat this exact format for all {actual_servings} meals of the day.\n"
        "Ensure that:\n"
        "1. All meals adhere to the specified diet, avoid allergies, exclude disliked foods, and follow dietary restrictions.\n"
        "2. Nutritional information is provided for the specified number of servings.\n"
        "3. No extra text, greetings, or conclusions are included.\n"
        "4. The format is followed exactly for each meal."
       
)
            
            # Call OpenAI API to generate the meal plan
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a meal planning assistant. Provide only the requested information without any additional text."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2500
            )

            # Extract and clean up the generated meal plan
            day_plan = response.choices[0].message['content'].strip()
            meal_plan += f"\n\nDay {day}:\n{day_plan}"

        # Return the complete meal plan as a JSON response
        return jsonify({"meal_plan": meal_plan.strip()})

    except Exception as e:
        # Log any errors and return an error message to the client
        error_message = str(e)
        logging.error('Error generating response: %s', error_message)
        return jsonify({"error": error_message}), 500


# Route to serve the homepage
@app.route('/')
def home():
    return "Welcome to the MealPlannerDB!"

# Route to insert new user documents into the database
@app.route('/insert', methods=['POST'])
def insert_documents():
    try:
        data = request.form  # Parse form data from the request
        name = data.get('Your Name')
        email = data.get('Email Address')
        phone = data.get('Phone')
        subject = data.get('Subject')
        # Hash the user's password for security before storing it in the database
        password = bcrypt.hashpw(data.get('Password').encode('utf-8'), bcrypt.gensalt())

        if not name or not email or not phone or not subject:
            # If required fields are missing, return an error message
            return jsonify({"error": "Invalid input: Name, email, phone, and subject are required."}), 400

        # Check if a user with the same email already exists in the database
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "Document with this email already exists"}), 400

        # Create a new user record and add it to the database
        new_user = User(name=name, email=email, phone=phone, subject=subject, password=password.decode('utf-8'))
        db.session.add(new_user)
        db.session.commit()

        # Return a success message along with the new user's ID
        return jsonify({"message": "Document inserted", "id": new_user.id})

    except Exception as e:
        # Log any errors and return an error message to the client
        logging.error('Error inserting document: %s', str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/show', methods=['GET'])
def show_user_data():
    user_id = request.headers.get('Authorization')
    if not user_id:
        return jsonify({"error": "No user ID provided"}), 400

    try:
        # Use db.session.get() instead of User.query.get()
        user = db.session.get(User, int(user_id))
        if user:
            user_data = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "subject": user.subject,
                "subscription_status": user.subscription_status,
                "subscription_end_date": user.subscription_end_date.isoformat() if user.subscription_end_date else None,
                "free_plan_used": user.free_plan_used,
                "preferred_meal": user.preferred_meal,  # Changed from "family members"
                "dietary_restriction": user.dietary_restriction,  # Fixed typo
                "food_allergy": user.food_allergy,
                "servings": user.servings,
                "dislikes": user.dislikes,
                "total_calories": user.total_calories
            }
            # Note: We're not including the password field for security reasons
            return jsonify(user_data)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# update the data
@app.route('/update', methods=['PUT'])
def update_user_data():
    user_id = request.headers.get('Authorization')
    if not user_id:
        return jsonify({"error": "No user ID provided"}), 400

    try:
        user = db.session.get(User, int(user_id))
        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.json

        # Update fields if they are present in the request
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'phone' in data:
            user.phone = data['phone']
        if 'subject' in data:
            user.subject = data['subject']
        if 'subscription_status' in data:
            user.subscription_status = data['subscription_status']
        if 'subscription_end_date' in data:
            user.subscription_end_date = datetime.strptime(data['subscription_end_date'], '%Y-%m-%d')
        if 'free_plan_used' in data:
            user.free_plan_used = data['free_plan_used']
        if 'preferred_meal' in data:
            user.preferred_meal = data['preferred_meal']
        if 'dietary_restriction' in data:
            user.dietary_restriction = data['dietary_restriction']
        if 'food_allergy' in data:
            user.food_allergy = data['food_allergy']
        if 'servings' in data: 
            user.servings = data['servings']
        if 'dislikes' in data:
            user.dislikes = data['dislikes']
        if 'total_calories' in data:
            user.total_calories = data['total_calories']

        db.session.commit()

        return jsonify({"message": "User data updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# insert food pref into db
@app.route('/add_meal_preference', methods=['POST'])
def add_meal_preference():
    try:
        # Extract data from the request
        data = request.json
        preferred_meal = data.get('preferred_meal')
        dietary_restriction = data.get('dietary_restriction')
        food_allergy = data.get('food_allergy')
        servings = data.get('servings')
        dislikes = data.get('dislikes')
        total_calories = data.get('total_calories')

        # Validate that the user ID is provided
        user_id = data.get('user_id')
        if not user_id:
            return jsonify({"error": "User ID is required."}), 400
        
        # Fetch the user from the database
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found."}), 404

        # Update the user's meal preferences
        user.preferred_meal = preferred_meal
        user.dietary_restriction = dietary_restriction
        user.food_allergy = food_allergy
        user.servings = servings
        user.dislikes = dislikes
        user.total_calories = total_calories

        # Commit the changes
        db.session.commit()

        return jsonify({"message": "Meal preferences updated successfully"}), 200

    except Exception as e:
        logging.error('Error updating meal preference: %s', str(e))
        return jsonify({"error": str(e)}), 500


@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        name = data.get('Your Name')
        email = data.get('Email Address')
        password = data.get('Password')
        phone = data.get('Phone')
        subject = data.get('Subject')
        preferred_meal = data.get('preferredMeal')
        dietary_restriction = data.get('dietaryRestriction')
        food_allergy = data.get('foodAllergy')
        servings = data.get('servings')
        dislikes = data.get('dislikes')
        total_calories = data.get('totalCalories')

        if not name or not email or not password:
            return jsonify({"error": "Invalid input: Name, email, and password are required."}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User with this email already exists"}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        new_user = User(
            name=name,
            email=email,
            password=hashed_password.decode('utf-8'),
            phone=phone,
            subject=subject,
            preferred_meal=preferred_meal,
            dietary_restriction=dietary_restriction,
            food_allergy=food_allergy,
            servings=servings,
            dislikes=dislikes,
            total_calories=total_calories
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

    except Exception as e:
        logging.error('Error during signup: %s', str(e))
        return jsonify({"error": str(e)}), 500


# Admin credentials
# Admin credentials
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "admin_password"

# Route to handle user login
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Handle preflight CORS request
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    try:
        # Handle actual login request
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        logging.debug(f"Login attempt for email: {email}")
        
        if not email or not password:
            logging.warning("Email or password missing in request")
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check if the admin is trying to log in
        if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
            logging.debug("Admin login successful")
            access_token = create_access_token(identity={"user_id": 0, "is_admin": True})
            return jsonify({
                "message": "Admin login successful",
                "access_token": access_token,
                "user_id": 0,
                "name": "Admin",
                "email": ADMIN_EMAIL,
                "is_admin": True,
                "redirect": "https://www.gbmeals.com/admin"
            }), 200
        
        # Find the user by email in the database
        user = User.query.filter_by(email=email).first()
        if not user:
             # If user is None, prompt to sign up
            logging.warning("Email not found. Please sign up.")
            return jsonify({"error": "Email not found. Please sign up."}), 404


        if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            logging.debug("Password check successful")
            access_token = create_access_token(identity={"user_id": user.id, "is_admin": False})
            return jsonify({
                "message": "Login successful",
                "access_token": access_token,
                "user_id": user.id,
                "name": user.name,
                "email": user.email,
                "redirect": "/"
            }), 200
        else:
            logging.warning("Invalid email or password")
            return jsonify({"error": "Invalid email or password"}), 401
    
    except Exception as e:
        logging.error(f'Error during login: {str(e)}', exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



@app.route('/send-pdf', methods=['POST'])
def send_pdf():
    data = request.json
    print("Received Data:", data)  # Log incoming data
    email = data.get('email')
    pdf_data = data.get('pdf')
    message = data.get('message', None)  # Optional field for a custom message

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:
        main_pdf_content = base64.b64decode(pdf_data['mainPDF'].split(',')[1])
        shopping_list_pdf_content = base64.b64decode(pdf_data['ShoppingListPdf'].split(',')[1])

        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = "Your Meal Plan and Shopping List PDFs"

        # Attach main PDF
        main_pdf_part = MIMEApplication(main_pdf_content, Name="meal_plan.pdf")
        main_pdf_part['Content-Disposition'] = 'attachment; filename="meal_plan.pdf"'
        msg.attach(main_pdf_part)

        # Attach shopping list PDF
        shopping_list_pdf_part = MIMEApplication(shopping_list_pdf_content, Name="shopping_list.pdf")
        shopping_list_pdf_part['Content-Disposition'] = 'attachment; filename="shopping_list.pdf"'
        msg.attach(shopping_list_pdf_part)

        # Add a text body to the email with optional message
        email_body = "Please find attached your meal plan and shopping list PDFs."
        if message:
            email_body += f"{message}"

        msg.attach(MIMEText(email_body, 'plain'))

        # Send email
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, email, msg.as_string())

        return jsonify({"message": "PDFs sent successfully"}), 200
    except Exception as e:
        logging.error('Error sending PDFs: %s', str(e))
        return jsonify({"error": str(e)}), 500

# Route to send a custom email with a PDF attachment
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()  # Parse JSON data from the request
    
    # Ensure all required fields are provided
    if not data or not all(k in data for k in ("to", "subject", "body", "pdf_data", "pdf_name")):
        return jsonify({"error": "Invalid input: 'to', 'subject', 'body', 'pdf_data', and 'pdf_name' are required."}), 400
    
    to_address = data['to']
    subject = data['subject']
    body = data['body']
    pdf_data = data['pdf_data']
    pdf_name = data['pdf_name']
    
    try:
        # Decode base64-encoded PDF data
        pdf_content = base64.b64decode(pdf_data)

        # Create an email message with the PDF attached
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = to_address
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Attach the PDF to the email
        pdf_part = MIMEApplication(pdf_content, Name=pdf_name)
        pdf_part['Content-Disposition'] = f'attachment; filename="{pdf_name}"'
        msg.attach(pdf_part)

        # Send the email via SMTP
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_address, msg.as_string())

        # Return a success message
        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        # Log any errors and return an error message to the client
        logging.error('Error sending email: %s', str(e))
        return jsonify({"error": str(e)}), 500





def send_subscription_ending_email(email, name, end_date, subscription_status):
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = email
        msg['Subject'] = "Your Subscription is Ending Soon!"

        # Determine the plan name based on the subscription status
        if subscription_status == 'pro':
            plan_name = "Starter"
        elif subscription_status == 'ultra_pro':
            plan_name = "Premium"
        else:
            plan_name = "Unknown"

        body = f"""
        Hello {name},

        We hope you've been enjoying your {plan_name} subscription with us!

        This is a friendly reminder that your subscription is set to end on {end_date.strftime('%Y-%m-%d')}.

        To continue enjoying our {plan_name} features, please renew your subscription before it expires`.

        If you have any questions or need assistance with renewal, please don't hesitate to contact our support team.

        Thank you for being a valued member of our community!

        Best regards,
        Team gb meals
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, email, msg.as_string())

        logging.info(f"Subscription ending email sent to {email}")
    except Exception as e:
        logging.error(f"Error sending subscription ending email to {email}: {str(e)}")

def send_subscription_ending_emails():
    with app.app_context():
        three_days_from_now = datetime.now() + timedelta(days=3)
        users = User.query.filter(
            User.subscription_status.in_(['pro', 'ultra_pro']),
            User.subscription_end_date == three_days_from_now.date()
        ).all()

        if users:
            for user in users:
                send_subscription_ending_email(user.email, user.name, user.subscription_end_date, user.subscription_status)
        else:
            logging.info("No users with subscriptions ending in 3 days.")

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Schedule the email sending function to run daily
    scheduler.add_job(func=send_subscription_ending_emails, trigger="cron", hour=0)
    scheduler.start()
    logging.info("Scheduler started for sending subscription ending emails.")
# Run the application
if __name__ == '__main__':
    start_scheduler()
    initialize_database()  # Initialize the database before starting the server
    app.run(debug=False, host="0.0.0.0", port="5000")  # Run the app on port 5000 with debugging disabled