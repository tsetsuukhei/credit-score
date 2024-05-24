from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F
import numpy as np
from sklearn.preprocessing import Normalizer
import uvicorn
from pydantic import BaseModel
import os

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

input_size = 21
hidden_size = 32 


class NeuralNetwork(torch.nn.Module):
    def __init__(self, input_size, hidden_size, dropout_rate=0.3):
        super(NeuralNetwork, self).__init__()
        self.fc1 = torch.nn.Linear(input_size, 128)
        self.bn1 = torch.nn.BatchNorm1d(128)
        self.relu1 = torch.nn.ReLU()
        self.dropout1 = torch.nn.Dropout(dropout_rate)
        
        self.fc2 = torch.nn.Linear(128, 64)
        self.bn2 = torch.nn.BatchNorm1d(64)
        self.relu2 = torch.nn.ReLU()
        self.dropout2 = torch.nn.Dropout(dropout_rate)
        
        self.fc3 = torch.nn.Linear(64, 32)
        self.bn3 = torch.nn.BatchNorm1d(32)
        self.relu3 = torch.nn.ReLU()
        self.dropout3 = torch.nn.Dropout(dropout_rate)
        
        self.fc4 = torch.nn.Linear(32, 16)
        self.bn4 = torch.nn.BatchNorm1d(16)
        self.relu4 = torch.nn.ReLU()
        self.dropout4 = torch.nn.Dropout(dropout_rate)
        
        self.fc5 = torch.nn.Linear(16, 8)
        self.bn5 = torch.nn.BatchNorm1d(8)
        self.relu5 = torch.nn.ReLU()
        self.dropout5 = torch.nn.Dropout(dropout_rate)
        
        self.fc6 = torch.nn.Linear(8, 3)
        self.sigmoid = torch.nn.Sigmoid()

    def forward(self, x):
        out = self.fc1(x)
        out = self.bn1(out)
        out = self.relu1(out)
        out = self.dropout1(out)
        
        out = self.fc2(out)
        out = self.bn2(out)
        out = self.relu2(out)
        out = self.dropout2(out)
        
        out = self.fc3(out)
        out = self.bn3(out)
        out = self.relu3(out)
        out = self.dropout3(out)
        
        out = self.fc4(out)
        out = self.bn4(out)
        out = self.relu4(out)
        out = self.dropout4(out)
        
        out = self.fc5(out)
        out = self.bn5(out)
        out = self.relu5(out)
        out = self.dropout5(out)
        
        out = self.fc6(out)
        out = self.sigmoid(out)
        
        return out
    
model = NeuralNetwork(input_size=input_size, hidden_size=hidden_size)
model_path = os.path.join(os.path.dirname(__file__), 'model', 'model.pth')

# Load the saved model weights
model.load_state_dict(torch.load(model_path))

class InputData(BaseModel):
    features: object


def preprocess_input(input_data):
    feature_order = [
        'Age', 'Occupation', 'Annual_Income', 'Monthly_Inhand_Salary', 
        'Num_Bank_Accounts', 'Num_Credit_Card', 'Interest_Rate', 'Num_of_Loan', 
        'Delay_from_due_date', 'Num_of_Delayed_Payment', 'Changed_Credit_Limit', 
        'Num_Credit_Inquiries', 'Credit_Mix', 'Outstanding_Debt', 
        'Credit_Utilization_Ratio', 'Credit_History_Age', 'Payment_of_Min_Amount', 
        'Total_EMI_per_month', 'Amount_invested_monthly', 'Payment_Behaviour', 
        'Monthly_Balance'
    ]

    print('input data n')
    print(input_data)

    processed_features = []
    for feature in feature_order:
        value = input_data[feature]
        if value == "":
            processed_features.append(0.0)
            # 0 baij bolohgui ch for the sake of simplifying it rn
        else:
            processed_features.append(float(value))

    X = np.asarray(processed_features)
    print(X)
    X = X.reshape(1, -1)  # Reshape to (1, 21)
    print(X)
    norm = Normalizer()
    X = norm.transform(X)

    # Convert to tensors
    X = torch.tensor(X, dtype=torch.float)

    return X

@app.post("/predict")
async def predict(input_data: InputData):
    features = input_data.features
    input_tensor = preprocess_input(features)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    input_tensor = input_tensor.to(device)
    model.to(device)

    model.eval()

    with torch.no_grad():
        output = model(input_tensor).flatten()
        print('output')
        print(output)

    # Apply softmax
    probabilities = F.softmax(output, dim=0)
    print('probabilities after softmax:')
    print(probabilities)
    
    predicted_class = torch.argmax(probabilities).item() + 1

    print(predicted_class)
    
    class_probabilities = {class_id + 1: probability.item() for class_id, probability in enumerate(probabilities)}
    return {"prediction": predicted_class, "probabilities": class_probabilities}

@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """
    A simple health check endpoint.
    """
    return {"status": "OK"}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)