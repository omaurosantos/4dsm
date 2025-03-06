import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { addCar, Car, removeCar } from "../redux/slices/carSlice";
export default function VehicleRegistration() {
    const cars = useSelector((state: RootState) => state.carsObject.cars);
    const [id, setId] = useState(1);
    const [plate, setPlate] = useState("");
    const [color, setColor] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const handleSave = () => {
        const car: Car = {
            id,
            plate,
            color,
        };
        dispatch(addCar(car));
        setId((prev: number) => prev + 1);
    };
    const handleColor = (id: number) => {
        const car = cars.find((car) => car.id === id);
        if (car) {
            dispatch(addCar({ ...car, color: "red" }));
        }
    };
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        dispatch(removeCar(id));
    };
    return (
        <div>
            <div>
                <div>
                    <label htmlFor="plate">Placa</label>
                    <input
                        id="plate"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="color">Cor</label>
                    <input
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSave}>Salvar</button>
                </div>
            </div>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <span onClick={() => handleColor(car.id)} onContextMenu={(e) => handleRemove(e as React.MouseEvent<HTMLButtonElement>, car.id)}>
                            {car.plate} - {car.color}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}