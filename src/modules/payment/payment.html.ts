export const paymentHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
      }
      .container {
        text-align: center;
        background-color: #fff;
        padding: 50px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
      }
      button:hover {
        background-color: #218838;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Payment Successful</h1>
      <p>Thank you for your payment. Your transaction has been successfully completed.</p>
      <button onclick="redirectToClient()">Go to Website</button>
    </div>

    <script>
      function redirectToClient() {
        window.location.href = 'https://level-2-24-assignment-6-clients.vercel.app';
      }
    </script>
  </body>
  </html>
`;

export const failedPaymentHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Failed</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
        .container {
          text-align: center;
          background-color: #fff;
          padding: 50px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
        button:hover {
          background-color: #c82333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed.</p>
        
        <button onclick="goToClient()">Go to Website</button>
      </div>

      <script>
       

        function goToClient() {
          window.location.href = 'https://level-2-24-assignment-6-clients.vercel.app;  
        }
      </script>
    </body>
    </html>
  `;
