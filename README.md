# IS442 OOP_FormApp

# IS442 OOP G1 T3

## Local development

### 🔧 Setting up

1️⃣ Clone the repository from GitHub to your `desired_folder_name`

```bash
git clone https://github.com/BryanTJJ99/OOP_FormApp.git
```

<br></br>

#### 🏃 Running the application

2️⃣ Open a new terminal and perform the commands below to install the required dependencies for the frontend and run the frontend app

```bash
cd ~/client/form-builder
npm install
npm run start
```

<br></br>

3️⃣ Open another new terminal and and perform the commands to install Java and springboot

```bash
cd ~/backend
mvn clean install && mvn spring-boot:run
```

<br></br>

4️⃣ To build backend, go to 
```bash
cd ~/backend
```
run either build.bat (Windows) or build.sh (MacOS)

## 5️⃣ Trying out our application

#### ✅ You can access the local webpage [here](http://localhost:3000/).

You can log in as vendor, admin or approver with the following users:
| role     | username | password |
|----------|----------|----------|
| vendor   | test1    | 123456789|
| admin    | test2    | 123456789|
| approver | test3    | 123456789|

<br></br>

## 6️⃣ Troubleshooting

####If npm start does not work
https://sabe.io/blog/node-npm-start-command-not-working

####If npm start does not work
https://stackoverflow.com/questions/23414609/mvn-spring-bootrun-doesnt-start-spring


