function generateQRCode() {
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const body = document.getElementById("body").value;

    // Controleer of alle velden ingevuld zijn
    if (email && subject && body) {
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Verberg de "Genereer QR Code" knop en toon de QR-code
        document.getElementById("generateQRBtn").style.display = "none";
        document.getElementById("qrCodePopup").style.display = "block";
        
        // Genereer de QR-code met de grotere dimensies
        $("#qrCode").empty(); // Verwijder de vorige QR-code (indien aanwezig)
        $("#qrCode").qrcode({
            text: mailtoLink,
            width: 1200,  // Vergroot de QR-code
            height: 1200, // Vergroot de QR-code
        });

        // Toon de download link
        document.getElementById("downloadLink").style.display = "block";
        document.getElementById("downloadLink").setAttribute("href", `data:image/png;base64,${$("#qrCode img")[0].src.split(',')[1]}`);
    } else {
        alert("Vul alstublieft alle velden in.");
    }
}

function resetForm() {
    // Reset alle velden en verborgen secties
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("body").value = "";
    document.getElementById("qrCodePopup").style.display = "none";
    document.getElementById("downloadLink").style.display = "none";
    document.getElementById("generateQRBtn").style.display = "inline-block";
}
