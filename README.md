# Invoice Generator and Email Sender

This project allows you to generate PDF invoices and send them via email using Node.js, Express, and Nodemailer. It's designed as a reusable feature that you can integrate into other projects whenever needed.

## Features

- Generate PDF invoices dynamically using customer information and purchased items.
- Send the generated PDF invoices as email attachments via Gmail.
- Simple setup with environment variables for easy configuration.
  
## Technologies Used

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Backend framework for handling API routes and requests.
- **Nodemailer**: Library for sending emails from Node.js using Gmail SMTP.
- **PDFKit**: Library to dynamically generate PDF documents for invoices.

## Prerequisites

Before you can run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Gmail account with [App Passwords](https://support.google.com/accounts/answer/185833?hl=en) enabled if using 2FA, or Gmail credentials for the SMTP server.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/invoice-email-sender.git
    cd invoice-email-sender
    ```

2. **Install the dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory with the following variables:

    ```env
    EMAIL=your-email@gmail.com
    PASSWORD=your-email-password-or-app-specific-password
    ```

   > **Note:** If you're using Gmail with 2FA enabled, generate an [App Password](https://support.google.com/accounts/answer/185833) and use it in place of your regular Gmail password.

## Usage

1. **Start the server**:

    ```bash
    npm run start
    ```

2. **Send an invoice**:

   Send a POST request to `http://localhost:5000/send-invoice` with the following JSON payload:

    ```json
    {
      "name": "Customer Name",
      "email": "customer@example.com",
      "items": [
        {
          "description": "Product 1",
          "quantity": 2,
          "price": 19.99
        },
        {
          "description": "Product 2",
          "quantity": 1,
          "price": 49.99
        }
      ]
    }
    ```

   Example using [Postman](https://www.postman.com/) or any HTTP client:

   - **Endpoint**: `POST /send-invoice`
   - **Body**: JSON data with `name`, `email`, and `items`.

   Once the request is sent, the invoice will be generated as a PDF and emailed to the recipient's email address.




## PDF Invoice Generation

Invoices are generated dynamically based on the user input (name, email, and purchased items). The PDF contains the following sections:

- Invoice Header (Invoice title, company details)
- Customer Details (name, email)
- Itemized List (description, quantity, unit price, and total price for each item)
- Total amount payable
- Invoice Footer (thank you message and payment terms)

## Sending the Invoice via Email

- The invoice is emailed to the user using Nodemailer.
- SMTP service used: Gmail
- The email contains the generated invoice PDF as an attachment with the subject "Your Invoice."

## Environment Variables

| Variable Name      | Description                           |
| ------------------ | ------------------------------------- |
| `EMAIL`            | Your Gmail email address              |
| `PASSWORD`         | Your Gmail password or app password   |

## License

This project is licensed under the ISC License.


