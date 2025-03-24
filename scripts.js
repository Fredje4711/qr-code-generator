function generateQRCode() {
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    if (email && subject && message) {
        var mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);

        // Detecteer schermgrootte voor mobiele apparaten
        var isMobile = window.innerWidth <= 600;

        // Stel de grootte van de QR-code in afhankelijk van het apparaat
        var qrSize = isMobile ? 300 : 200;
        var fontSizeTitle = isMobile ? "72px" : "24px";
        var fontSizeLink = isMobile ? "48px" : "18px";

        // Open een popup-venster
        var popupWidth = isMobile ? 500 : 400;
        var popupHeight = isMobile ? 600 : 400;
        var popupWindow = window.open("", "QR Code", "width=" + popupWidth + ",height=" + popupHeight);

        // HTML voor de popup met gecentreerde QR-code en QRCode bibliotheek
        var htmlContent = `
            <html>
            <head>
                <title>QR Code</title>
                <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
                <style>
                    body { text-align: center; margin-top: 20px; font-family: Arial, sans-serif; }
                    h2 { font-size: ${fontSizeTitle}; }
                    a, button { font-size: ${fontSizeLink}; margin-top: 10px; }
                    #qrCodePopup { display: flex; justify-content: center; align-items: center; margin: 20px; }
                </style>
            </head>
            <body>
                <h2>QR Code</h2>
                <div id="qrCodePopup"></div>
                <br>
                <a id="downloadLink" href="#" download="qr_code.png">Download QR Code</a>
                <br><br>
                <button onclick="window.close()">Sluit venster</button>

                <script>
                    var qr = new QRCode(document.getElementById("qrCodePopup"), {
                        text: "${mailtoLink}",
                        width: ${qrSize},
                        height: ${qrSize}
                    });
                    var canvas = document.querySelector("canvas");
                    var qrDataUrl = canvas.toDataURL("image/png");
                    document.getElementById("downloadLink").href = qrDataUrl;
                </script>
            </body>
            </html>
        `;
        popupWindow.document.write(htmlContent);
        popupWindow.document.close();
    } else {
        alert("Vul alstublieft alle velden in.");
    }
}

function resetForm() {
    document.getElementById("qrForm").reset();
}
