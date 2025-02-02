# Use Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 5001

# Start the translation service
CMD ["python", "translate_service.py"]
