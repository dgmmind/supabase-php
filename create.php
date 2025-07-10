<?php

$supabaseUrl = 'URL_SUPABASE';
$apiKey = 'API_KEY';
$table = 'users';


$name = $_POST['user_name'];
$email = $_POST['user_email'];
$phone = $_POST['user_phone'];

$data = [
    'user_name' => $name,
    'user_email' => $email,
    'user_phone' => $phone
];

$ch = curl_init("$supabaseUrl/rest/v1/$table");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $apiKey",
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json",
    "Prefer: return=representation"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "Error al insertar: $error";
} else {
    echo "Usuario registrado:<br><pre>$response</pre>";
}
?>
