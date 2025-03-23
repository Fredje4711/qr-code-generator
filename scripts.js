function generateQRCode() {
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    if (email && subject && message) {
        var mailtoLink = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);

        // Nieuwe pop-up venster openen
        var popupWindow = window.open("", "QR Code", "width=400,height=400");

        // HTML voor de popup
        var htmlContent = `
            <div style="text-align:center; margin-top:20px;">
                <h2>QR Code</h2>
                <div id="qrCodePopup"></div>
                <br>
                <a id="downloadLink" href="#" download="qr_code.png">Download QR Code</a>
                <br><br>
                <button onclick="window.close()">Sluit venster</button>
            </div>
        `;
        popupWindow.document.write(htmlContent);

        // QR-code genereren in de pop-up, vergroot naar 400x400 voor betere zichtbaarheid op mobiel
        var qr = new QRCode(popupWindow.document.getElementById("qrCodePopup"), {
            text: mailtoLink,
            width: 400,
            height: 400
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
