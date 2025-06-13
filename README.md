# AWS Deploy Demo (Full Stack App)
```
+-----------------+                   +-------------------------+                   +-----------------------+
|                 |  (Push Docker)    |                         |   (Pull Docker)   |                       |
| Local           |     Image         | AWS ECR Repository      |      IMage        | EC2 Instance          |
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
