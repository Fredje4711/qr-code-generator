function generateQRCode() {
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    if (email && subject && message) {
        var mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);

        // Detecteer schermgrootte voor mobiele apparaten
        var isMobile = window.innerWidth <= 700; // Schaal naar 600px voor mobiel, kan je aanpassen voor je wens

        // Stel pop-up venster grootte in op basis van schermgrootte
        var popupWidth = isMobile ? 500 : 600;  // Groter voor mobiel
        var popupHeight = isMobile ? 500 : 400; // Groter voor mobiel

        // Nieuwe pop-up venster openen met aangepaste grootte
        var popupWindow = window.open("", "QR Code", "width=" + popupWidth + ",height=" + popupHeight);

        // HTML voor de popup
        var htmlContent = `
            <div style="text-align:center; margin-top:5px; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                <h2 id="popupTitle" style="font-size: ${isMobile ? '42px' : '30px'};">QR Code</h2>
                <div id="qrCodePopup" style="margin-top: 5px;"></div>
                <br>
                <a id="downloadLink" href="#" download="qr_code.png" style="font-size: ${isMobile ? '34px' : '24px'};">Download QR Code</a>
                <br><br>
                <button onclick="window.close()" style="font-size: ${isMobile ? '34px' : '24px'};">Sluit venster</button>
            </div>
        `;
        popupWindow.document.write(htmlContent);

        // QR-code genereren in de pop-up, groter voor mobiel
        var qrSize = isMobile ? 500 : 200; // Groter voor mobiel
        var qr = new QRCode(popupWindow.document.getElementById("qrCodePopup"), {
            text: mailtoLink,
            width: qrSize,
            height: qrSize
        });

        // Set download link for the QR code
        var canvas = popupWindow.document.querySelector("canvas");
        var qrDataUrl = canvas.toDataURL("image/png");
        popupWindow.document.getElementById("downloadLink").href = qrDataUrl;
    } else {
        alert("Vul alstublieft alle velden in.");
    }
}

function resetForm() {
    document.getElementById("qrForm").reset();
}
