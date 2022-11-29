import { Student } from '../interfaces/Student';
import swal from 'sweetalert';


const getOneWithRestrictionsById = async (id: Number | undefined) => {
    const response = await fetch(`http://localhost:5000/students?restrictions=${id}`)
    const data = await response.json();
    if (response.status == 200) {
        return data;
    }
    return false;
}

const getUserById = async (id: Number | undefined) => {
    const response = await fetch(`http://localhost:5000/students?id=${id}`)
    const data = await response.json();
    if (response.status == 200) {
        return data;
    }
    return false;
}

const getStudentByRa = async (ra: String | undefined) => {
    const response = await fetch(`http://localhost:5000/students?ra=${ra}`);
    const data = await response.json();
    if (response.status == 200) {
        return data[0];
    }
    return false;
}

const createStudent = async (student: Student, school_id: Number) => {
    const formData = new FormData();

    formData.append("ra", student.ra);
    formData.append("email", student?.email);
    formData.append("name", student?.name);
    formData.append("telephone", student.telephone);
    formData.append("school_id", school_id.toString());

    const response = await fetch(`http://localhost:5000/students`,
        { method: "POST", body: formData },
    );
    const res = await response.json()

    if (response.status == 200) {
        const formData = new FormData();

        formData.append("ra", student.ra);
        formData.append("password", res["pwd"]);

        await fetch(`http://localhost:5000/students?sendmail`,
            { method: 'POST', body: formData })

        swal(res["msg"], {
            icon: "success"
        }).then(() => window.location.reload());
    } else {
        swal(res["msg"], {
            icon: "error"
        }).then(() => window.location.reload());
    }
}

const deleteOneById = async (id: Number | undefined) => {

    swal({
        title: "Tem certeza que deseja deletar o estudante?",
        text: "Uma vez deletado, a operação não poderá ser desfeita",
        icon: "warning",
        buttons: ["Não", "Sim"]
    }).then(async (deletar) => {
        if (deletar) {
            const response = await fetch(`http://localhost:5000/students?delete=${id}`);

            if (response.status == 200) {
                swal(await response.json(), {
                    icon: "success"
                }).then(() => window.location.reload());
            } else {
                swal(await response.json(), {
                    icon: "error"
                }).then(() => window.location.reload());
            }
        }
    }).catch(() => swal({ title: "Ocorreu um erro ao deletar a requisição", icon: "error" }));;
}

const updateOneById = async (student: Student) => {
    const formData = new FormData()

    swal({
        title: "Tem certeza que deseja modificar as informações do aluno?",
        icon: "warning",
        buttons: ["Não", "Sim"]
    }).then(async (update) => {

        if (update) {
            formData.append("email", `${student.email}`);
            formData.append("name", `${student.name}`);
            formData.append("telephone", `${student.telephone}`);

            const response = await fetch(`http://localhost:5000/students?id=${student.id}`,
                { method: "POST", body: formData },
            );

            if (response.status == 200) {
                swal(await response.json(), {
                    icon: "success"
                }).then(() => window.location.reload());
            } else {
                swal(await response.json(), {
                    icon: "error"
                }).then(() => window.location.reload());
            }
        }
    }).catch(() => swal({ title: "Ocorreu um erro ao modificar a requisição", icon: "error" }));;
}


export { getUserById, createStudent, getStudentByRa, getOneWithRestrictionsById, deleteOneById, updateOneById }