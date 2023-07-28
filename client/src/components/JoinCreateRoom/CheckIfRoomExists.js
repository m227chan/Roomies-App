const serverURL = "https://roomies-app.netlify.app/"; //enable for dev mode
// const serverURL ="http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3006";

const CheckIfRoomExists = async (roomID) => {

    try {
        const callAPICheckIfRoomExists = async () => {
            const url = serverURL + "/api/checkIfRoomExists";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //authorization: `Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    idRoom: roomID,
                    idRoom: roomID,
                })
            });
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            // console.log("User settings: ", body);
            return body;
        }

        const res = await callAPICheckIfRoomExists();
        var parsed = JSON.parse(res.express);
        return parsed[0].value;

    } catch (e) {
        return null;
    }
}

export default CheckIfRoomExists;
