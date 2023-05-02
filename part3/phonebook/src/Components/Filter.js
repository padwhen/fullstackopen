import React, {useState} from "react"

const Filter = ({filterName, handleFilterName}) => {
    return (
        <div>
            filter shown with: <input value={filterName} onChange={handleFilterName} />
        </div>
    )
}
export default Filter