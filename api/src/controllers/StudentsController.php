<?php
require_once "src/database/connection.php";
require_once "src/models/students.php";

class StudentsController
{
    private $studentsModel;

    public function __construct()
    {
        $this->studentsModel = new StudentsModel();
    }

    public function readOneWithECsById()
    {
        try {
            $student = $this->studentsModel->getStudentAndECById($_GET["ecs"]);
            if ($student) {
                echo json_encode($student);
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum livro foi carregado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function update()
    {
        try {
            $name = "";
            $email = "";
            $telephone = "";

            if (isset($_POST["name"])) {
                $name = $_POST["name"];
            }
            if (isset($_POST["email"])) {
                $email = $_POST["email"];
            }
            if (isset($_POST["telephone"])) {
                $telephone = $_POST["telephone"];
            }

            $student = $this->studentsModel->updateStudent($_GET["id"], $name, $email, $telephone);
            if ($student) {
                echo json_encode("Um estudante foi modificado com sucesso");
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum estudante foi atualizado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function create()
    {
        try {
            $ra = $_POST["ra"];
            $name = $_POST["name"];
            $email = $_POST["email"];
            $telephone = $_POST["telephone"];
            $password = $_POST["password"];
            $school_id = $_POST["school_id"];

            $student = $this->studentsModel->createStudent(
                $ra,
                $name,
                $email,
                $telephone,
                $password,
                $school_id
            );

            if ($student) {
                echo json_encode("Um estudante foi adicionado com sucesso");
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum estudante foi criado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function readAll()
    {
        try {
            $student = $this->studentsModel->getAllStudents();
            if ($student) {
                echo json_encode($student);
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum livro foi carregado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function readOneById()
    {
        try {
            $student = $this->studentsModel->getStudentById($_GET["id"]);
            if ($student) {
                echo json_encode($student);
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum livro foi carregado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function readOneByRa()
    {
        try {
            $student = $this->studentsModel->getStudentByRa($_GET["ra"]);
            if ($student) {
                echo json_encode($student);
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum livro foi carregado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }

    public function delete()
    {
        try {
            $student = $this->studentsModel->deleteStudent($_GET["delete"]);
            if ($student) {
                echo json_encode("Um estudante foi deletado com sucesso");
                http_response_code(200);
                exit();
            }
            echo json_encode("Nenhum estudante foi deletado");
            http_response_code(404);
            exit();
        } catch (\Throwable $th) {
            echo json_encode("Ocorreu um problema na requisição");
            http_response_code(500);
            exit();
        }
    }
}
