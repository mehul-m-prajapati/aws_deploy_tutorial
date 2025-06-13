## AWS Deploy Demo (Full Stack App)
```
+-----------------+                   +-------------------------+                   +-----------------------+
|                 |  (Push Docker)    |                         |   (Pull Docker)   |                       |
| Local           |     Image         | AWS ECR Repository      |      Image        | EC2 Instance          |
| Machine         |------------------>| <aws_account_id>.ecr... |-----------------> | - Docker installed    |
| (Build Docker)  |                   |                         |                   | - docker compose up   |
|                 |                   |                         |                   |                       |
|                 |                   |                         |                   |  +-----------------+  |
|                 |                   |                         |                   |  | Running         |  |
|                 |                   |                         |                   |  | Node+React      |  |
|                 |                   |                         |                   |  | Docker Container|  |
|                 |                   |                         |                   |  +-----------------+  |
+-----------------+                   +-------------------------+                   +-----------------------+


                                Access via browser/API: http://<EC2-public-IP>/status
```

### Push docker images to ECR
```
aws configure
ls ~\.aws\
aws ecr create-repository --repository-name my-node-react-app --region us-east-1
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app
docker tag aws_deploy_tutorial-frontend 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:frontend
docker tag aws_deploy_tutorial-backend 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:backend
docker push 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:frontend
docker push 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:backend
aws ecr list-images --repository-name my-node-react-app --region us-east-1
```

### Prepare your EC2 instance
- Launch an EC2 instance (Amazon Linux 2 or Ubuntu are good choices)
- Make sure security groups allow ports 80, 3000, and 5173 as needed
- Connect to the instance via SSH

### Install Docker and Docker Compose on EC2
For Amazon Linux 2:
```
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
# Log out and back in to refresh groups

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### Authenticate Docker to your ECR registry on EC2
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 547523460307.dkr.ecr.us-east-1.amazonaws.com
```

- Make sure AWS CLI is installed and configured with an IAM role or credentials that can access ECR.
- Best practice: Assign an IAM role with ECR pull permissions to the EC2 instance.

### Modify your docker-compose.yml for remote images
```
version: '3'

services:
  frontend:
    container_name: react_app
    image: 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:frontend
    ports:
      - "5173:80"
  backend:
    container_name: node_server
    image: 547523460307.dkr.ecr.us-east-1.amazonaws.com/my-node-react-app:backend
    ports:
      - "3000:3000"
```

### Copy your updated docker-compose.yml to the EC2 instance
```
scp -i your-key.pem docker-compose.yml ec2-user@your-ec2-ip:~
```

### On EC2, run the containers
```
docker-compose up
```
