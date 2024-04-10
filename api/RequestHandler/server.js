const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const cars = require('./api/cars.json');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Get all cars
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

// Get car by id
app.get('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    if (!car){
        console.log('kukhona inkinga')
        return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
});

// Update car
app.put('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) return res.status(404).json({ message: 'Car not found' });
    cars[index] = updatedCar;
    res.json(updatedCar);
});

// Delete car
app.delete('/api/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) return res.status(404).json({ message: 'Car not found' });
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

// Add car
app.post('/api/cars', (req, res) => {
    const newCar = req.body;
    if (!newCar.id || !newCar.make || !newCar.model || !newCar.year || !newCar.price) {
        return res.status(400).json({ message: 'Invalid car data' });
    }
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
