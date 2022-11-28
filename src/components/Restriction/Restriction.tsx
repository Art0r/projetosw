import { Restriction } from "../../interfaces/restriction";

const RestrictionComponent: React.FC<{ restriction: Restriction, handleActiveModal: () => void, handleRestrictionId: (id: Number) => void }> = ({ restriction, handleActiveModal, handleRestrictionId }) => {

    const handleClick = (e: any) => {
        e.preventDefault();
        handleRestrictionId(restriction.id);
        handleActiveModal();
    }

    return (
        <tr>
            <td>{restriction.title}</td>
            <td>
                <button className="button is-light is-link"
                    onClick={handleClick}>Mais informações</button>
            </td>
        </tr>
    );
}

export default RestrictionComponent;