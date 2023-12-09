const Filter = ({ persons, filter, handleFilterChange }) => {
    return (
        <div>
            <form>
                <div>
                    filter with <input
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default Filter