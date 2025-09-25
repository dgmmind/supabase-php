<?php
header('Content-Type: application/json');

if (!isset($_FILES['file'])) {
    echo json_encode(['success' => false, 'error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
$uploadDir = 'uploads/';
$uploadPath = $uploadDir . basename($file['name']);

// Ensure uploads directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Move the uploaded file
if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
    echo json_encode(['success' => true, 'url' => $uploadPath]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to upload file']);
}
?>