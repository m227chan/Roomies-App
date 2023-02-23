const callAPICheckIfRoomExists = async (serverURL, roomID) => {
    const url = serverURL + "/api/checkIfRoomExists";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //authorization: `Bearer ${this.state.token}`
        },
        body: JSON.stringify({
            idRoom: roomID
        })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("User settings: ", body);
    return body;
}

export default callAPICheckIfRoomExists;