<?php

// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$pdo = new PDO('sqlite:posts.db');
// なければテーブル作成
$pdo->exec('CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY, title TEXT, content TEXT);');

// jsonを返す関数
function print_json($data)
{
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    try {
        $id = $_GET['id'];
        $stmt = $pdo->query('SELECT * FROM posts WHERE id=?;');
        $stmt->execute([$id]);
        $rows = $stmt->fetch(PDO::FETCH_ASSOC);
        print_json($rows);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['q'])) {
    try {
        $q = $_GET['q'];
        $stmt = $pdo->query('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY id DESC;');
        $stmt->execute(["%{$q}%", "%{$q}%"]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_json($rows);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM posts ORDER BY id DESC;');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print_json($rows);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $json = file_get_contents('php://input', true);
        $json = json_decode($json);
        $title = $json->title;
        $content = $json->content;
        $stmt = $pdo->prepare('INSERT INTO posts(title, content) VALUES (?, ?);');
        $stmt->execute([$title, $content]);
        print_json(['ok' => 'posted']);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    try {
        $json = file_get_contents('php://input', true);
        $json = json_decode($json);
        $id = $json->id;
        $title = $json->title;
        $content = $json->content;
        $stmt = $pdo->prepare('UPDATE posts SET title=?, content=? WHERE id=?;');
        $stmt->execute([$title, $content, $id]);
        print_json(['ok' => 'updated']);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $json = file_get_contents('php://input', true);
        $json = json_decode($json);
        $id = $json->id;
        $stmt = $pdo->prepare('DELETE FROM posts WHERE id=?;');
        $stmt->execute([$id]);
        print_json(['ok' => 'deleted']);
    } catch (Exception $e) {
        print_json(['error' => $e->getMessage()]);
    }
} else {
    print_json(['error' => 'error']);
}
