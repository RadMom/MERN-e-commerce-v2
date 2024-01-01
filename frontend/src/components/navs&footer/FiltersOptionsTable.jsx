import React, { useState } from "react";
import classes from "./FiltersOptionsTable.module.css";

const FiltersOptionsTable = () => {
    const filtersOptions = {
        Search: "",
        Category: ["test1", "test2", "test3", "test4"],
        "Sort By": ["price", "name"],
        "Per Page": [8, 16, 24],
    };

    // State to store selected values for each filter
    const [selectedOptions, setSelectedOptions] = useState({
        Search: "",
        Category: "",
        sortBy: "",
        productsPerPage: "",
    });

    // Function to handle changes in the selected options
    const handleOptionChange = (key, value) => {
        setSelectedOptions({ ...selectedOptions, [key]: value });
    };

    return (
        <div className={classes["filters-container"]}>
            <table className={classes["filters-table"]}>
                <tbody>
                    <tr className={classes["products-table-tr"]}>
                        {Object.keys(filtersOptions).map((key) => (
                            <td key={key}>
                                <label>{key}</label>
                                {key === "Search" ? (
                                    <input
                                        type="text"
                                        value={selectedOptions[key]}
                                        onChange={(e) => handleOptionChange(key, e.target.value)}
                                    />
                                ) : (
                                    <select
                                        value={selectedOptions[key]}
                                        onChange={(e) => handleOptionChange(key, e.target.value)}
                                    >
                                        {filtersOptions[key].map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button onClick={() => console.log(selectedOptions)}>Submit</button>
        </div>
    );
};

export default FiltersOptionsTable;
