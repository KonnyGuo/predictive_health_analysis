Summary: predictive healthcare system that monitors patient vital signs over time. The goal is to create an early warning system for doctors and medical staff

Data Insertion: Load sample json data into the database:

<img src="public/imgs/dataInsert.png" alt="Sample Data Insertion" style="width:300px;">

Create a training model with brain.js creating a NeuralNetwork. Normalize data to scale all inputs to a similar range.

Load up sample data from the database and use the trainingModel create to train on the sample database data and save into a train_modeled json file

<img src="public/imgs/train_model.png" alt="Sample Data Insertion" style="width:300px;">

Using the train_modeled.son file and brain.js for risk assessment on patients. 
Keep a traditional low and high values for vitals signs of heartRate, bloodPressureSystolic, bloodPressureDiastolic, oxygenSaturation, and temperature for when model check fails.

<img src="public/imgs/addPatient.png" alt="Sample Data Insertion" style="width:300px;">

<img src="public/imgs/patientDashboard.png" alt="Sample Data Insertion" style="width:300px;">

Docker Setup: 
git clone 

