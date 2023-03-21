import React, { useState } from "react";
import "./Expense.css";
import {
    Typography,
    Card
} from "@mui/material";

const ShortExchange = ({ shortExchangeList }) => {
    // console.log(shortExchangeList);
    return (
        <div>
            <Card class="card">
        {shortExchangeList.map((expense, index) => (
                    <Typography key={index}>
                        {expense.transaction}
                    </Typography>
                ))}
                </Card>
        </div>
    );
};

export default ShortExchange;