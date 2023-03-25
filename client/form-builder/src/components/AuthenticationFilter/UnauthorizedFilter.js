import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    // const goBack = () => navigate(-1);
    // goBack() to navigate the authenticated user back to settings page (-1 cannot work)
    const goBack = () => navigate("/Settings");

    return (
        <section>
            <h1>Unauthorized 403</h1>
            <br />
            <h4>You do not have access to the requested page.</h4>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back to Settings</button>
            </div>
        </section>
    );
};

export default Unauthorized;
