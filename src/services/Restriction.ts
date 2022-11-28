import swal from "sweetalert";
import { Restriction } from "../interfaces/restriction";

const getOneById = async (id: Number | undefined) => {
    const response = await fetch(`http://localhost:5000/restrictions?id=${id}`);
    const data: Restriction[] = await response.json();
    if (response.status == 200) {
        return data;
    }
    return false;
}

const createOne = async (title: string, description: string, student_id: Number) => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('student_id', student_id.toString());

    const response = await fetch(`http://localhost:5000/restrictions`,
        { method: 'POST', body: formData }
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

const deleteOneById = async (id: Number | undefined) => {

    swal({
        title: "Tem certeza que deseja deletar a restrição?",
        text: "Uma vez deletada, a operação não poderá ser desfeita",
        icon: "warning",
        buttons: ["Não", "Sim"]
    }).then(async (deletar) => {
        if (deletar) {
            const response = await fetch(`http://localhost:5000/restrictions?delete=${id}`);

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

const updateById = async (restriction: Restriction | undefined) => {
    const formData = new FormData()

    swal({
        title: "Tem certeza que deseja modificar as informações da restrição?",
        icon: "warning",
        buttons: ["Não", "Sim"]
    }).then(async (update) => {

        if (update) {
            formData.append("title", `${restriction?.title}`);
            formData.append("description", `${restriction?.description}`);
            formData.append("student_id", `${restriction?.student_id}`);

            const response = await fetch(`http://localhost:5000/restrictions?id=${restriction?.id}`,
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
    }).catch(() => swal({ title: "Ocorreu um erro ao modificar a requisição", icon: "error" }));
}

export { getOneById, createOne, deleteOneById, updateById }