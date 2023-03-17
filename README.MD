#### Application Link

**https://encdecrypt.netlify.app/**

#### Project Description
Created with ExpressJs.Data is stored in MongoDB. The project aims to test the use of symmetric and asymmetric encryption algorithms. By showing the encrypted and plain texts together, it can be seen how different key choices affect encryption. 

#### Using the App

Since the host in the free version wakes up late, opening the application (while user login) is delayed for 15-20 seconds.

User can login to the system with username **"kemalege"** and password **"123456"**.
On the page that opens after logging in, the **Save** button encrypts the entered plain text with the **AES-256** symmetric encryption algorithm and saves it to the database.
In **Key** selection, **Key 1** provides encryption with "5468617473206D79204B756E67204675" key and **Key 2** with "10110010011010110100101110101101".
The **fetch** button brings the last recorded ciphertext by decrypting it with the AES-256 algorithm.
The **Show all records** button displays all plaintexts with their ciphertext.
Profile image can be added and image information is stored in the database

**Frontend Repository** : https://github.com/kemalege/cryptology-fe.git
