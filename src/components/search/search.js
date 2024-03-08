import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, geoApiUrl } from "../../api";

export default function Search({ onSearchChange }) {
	const [search, setSearch] = useState(null);

	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};

	const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
                `${geoApiUrl}?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );
    
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
    
            const data = await response.json();
    
            const cities = data.data;
    
            const options = cities.map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
            }));
    
            return { options };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    

	return (
		<>
			<AsyncPaginate
				placeholder="search for city"
				debounceTimeout={600}
				value={search}
				onChange={handleOnChange}
				loadOptions={loadOptions}
			/>
		</>
	);
}
