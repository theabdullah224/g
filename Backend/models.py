import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import logging


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://neondb_owner:1ZSrp6RiwONU@ep-lively-hill-a5h86jid.us-east-2.aws.neon.tech/neondb?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
logger = logging.getLogger(__name__)
db =SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    subject = db.Column(db.String(200))
    password = db.Column(db.String(200))
    subscription_status = db.Column(db.String(20), default='inactive')
    subscription_end_date = db.Column(db.DateTime, nullable=True)
    free_plan_used = db.Column(db.Boolean, default=False)
    verification_code = db.Column(db.String(6), nullable=True)  # Verification code as a string
    verification_code_expiry = db.Column(db.DateTime, nullable=True) 
    def is_subscription_active(self):
        now = datetime.utcnow()
        logger.info(f"Checking subscription for user {self.email}")
        logger.info(f"Current status: {self.subscription_status}")
        logger.info(f"Subscription end date: {self.subscription_end_date}")
        logger.info(f"Free plan used: {self.free_plan_used}")

        if self.subscription_status == 'free':
            logger.info(f"Free plan check: free_plan_used={self.free_plan_used}")
            return not self.free_plan_used
        if self.subscription_status in ['active', 'pro', 'ultra_pro']:
            if self.subscription_end_date is None:
                logger.warning(f"Subscription end date is None for {self.email}")
                return False
            logger.info(f"Paid plan check: now={now}, end_date={self.subscription_end_date}")
            return now < self.subscription_end_date
        logger.info(f"Subscription inactive: status={self.subscription_status}")
        return False


    def can_generate_pdf(self):
        return self.is_subscription_active()

    def use_free_plan(self):
        if self.subscription_status == 'free' and not self.free_plan_used:
            self.free_plan_used = True
            db.session.commit()
 
    def generate_pdf(self):
        if self.subscription_status == 'free':
            self.pdf_generated = True
        else:
            self.pdf_generated = False
        db.session.commit()

def initialize_database():
    with app.app_context():
        db.create_all()  # Ensure tables are created
        test_email = "test@example.com"
        if not User.query.filter_by(email=test_email).first():
            test_user = User(name="Test User", email=test_email, subscription_status="active")
            db.session.add(test_user)
            db.session.commit()
            print(f"Test user added: {test_email}") # Create a new database with the schema defined
        
        # Check if the test user already exists
        test_email = "test@example.com"
        existing_user = User.query.filter_by(email=test_email).first()
        
        if not existing_user:
            # Add a test user only if it doesn't exist
            test_user = User(name="Test User", email=test_email, subscription_status="active")
            db.session.add(test_user)
            db.session.commit()
            print(f"Test user added: {test_email}")
        else:
            print(f"Test user already exists: {test_email}")

if __name__ == '__main__':
    initialize_database()  # Initialize the database
    app.run(debug=False, host="0.0.0.0", port="5000")


