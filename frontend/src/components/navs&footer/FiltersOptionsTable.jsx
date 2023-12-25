import React, { useState } from "react";

const FiltersOptionsTable = () => {
    const filtersOptions = {
        Category: ["test1", "test2", "test3", "test4"],
        sortBy: ["price", "name"],
        productsPerPage: [5, 10, 15],
        search: "",
    };

    // State to store selected values for each filter
    const [selectedOptions, setSelectedOptions] = useState({
        Category: "",
        sortBy: "",
        productsPerPage: "",
        search: "",
    });

    // Function to handle changes in the selected options
    const handleOptionChange = (key, value) => {
        setSelectedOptions({ ...selectedOptions, [key]: value });
    };

    return (
        <div>
            <table>
                <tbody>
                    {Object.keys(filtersOptions).map((key) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                {key === "search" ? (
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
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => console.log(selectedOptions)}>Submit</button>
        </div>
    );
};

export default FiltersOptionsTable;
