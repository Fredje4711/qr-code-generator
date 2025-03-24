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

        // Verhoog de popup hoogte
        popupHeight = isMobile ? 700 : 500;

        var popupWindow = window.open("", "QR Code", "width=" + popupWidth + ",height=" + popupHeight);

        // HTML voor de popup met gecentreerde QR-code en QRCode bibliotheek
        var htmlContent = `
            <html>
            <head>
                <title>QR Code</title>
                <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
                <style>
                    body { text-align: center; margin-top: 20px; font-family: Arial, sans-serif; }
                    h2 { font-size: ${fontSizeTitle}; }
                    a, button { font-size: ${fontSizeLink}; margin-top: 10px; 
                        color: #23a9e4;
                        text-decoration: none;
                    }

                    a:hover {
                        text-decoration: none; /* Geen onderstreping bij hover */
                    }

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

                <div style="text-align: center; margin-top: 20px; font-size: 1.1em;">
                    Auteur: Diabetes Liga Midden-Limburg
                    <br>
                    <a href="http://www.dlml.be" target="_blank" style="color: #23a9e4; text-decoration: none; font-size: 1.2em;">
                        <span style="font-size: 1.4em; vertical-align: middle;">🌐</span> www.dlml.be
                    </a>
                </div>

                <script>
                    var qr = new QRCode(document.getElementById("qrCodePopup"), {
                        text: "${mailtoLink}",
                        width: ${qrSize},
                        height: ${qrSize}
                    });

                    var downloadLink = document.getElementById("downloadLink");
                    downloadLink.addEventListener("click", function(event) {
                        var canvas = document.querySelector("canvas");
                        var qrDataUrl = canvas.toDataURL("image/png");

                        // Simulate download
                        downloadLink.href = qrDataUrl;
                        downloadLink.download = "qr_code.png";
                    });

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