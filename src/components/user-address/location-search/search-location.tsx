import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const SearchLocation = ({ panTo }: any) => {
    const [locations, setLocations] = useState<any>();
    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();


    useEffect(() => {
        if (status === "OK") {
            let locations = data.map(({ id, description }: any) => { return { "id": id, "description": description } });
            setLocations(locations);
        }
    }, [status]);


    const handleInput = async (e: any) => {
        setValue(e.target.value);
        console.log(e);
        if (e.target.value?.description) {
            var address = e.target.value?.description;
            const results = await getGeocode({ address: e.value?.description });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, address });
        }
    };

    const handleSelect = async (address: any) => {

        setValue(address?.query, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address: address?.query });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, value });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="p-fluid">
            <AutoComplete placeholder="Search your location" style={{'width':'100%'}}  value={value} suggestions={locations} completeMethod={handleSelect} field="description"  onChange={(e) => handleInput(e)} />{/*LT*/}
        </div>
    );
}


export default SearchLocation;