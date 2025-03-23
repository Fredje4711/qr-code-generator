// Functie om QR Code te genereren
function generateQRCode() {
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;

    // Controleer of de velden ingevuld zijn
    if (email && subject && body) {
        var qrText = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Zorg ervoor dat de QR-code wordt gegenereerd
        var qrCode = new QRCode(document.getElementById("qr-code"), {
            text: qrText,
            width: 256, // grootte van de QR code
            height: 256
        });
    } else {
        alert("Vul alle velden in voordat je de QR-code genereert.");
    }
}

// Functie om het formulier te resetten
function resetForm() {
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("body").value = "";
    document.getElementById("qr-code").innerHTML = ""; // QR-code wissen
}
