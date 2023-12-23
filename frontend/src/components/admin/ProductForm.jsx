import React from "react";

const ProductForm = () => {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="productTitle">title</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        id="name"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
