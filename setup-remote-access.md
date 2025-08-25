# Setting Up Remote Access

## Step 1: Copy SSH Key to Remote Server

Run this command to copy your SSH public key to the remote server:

```bash
ssh-copy-id desidia26@192.168.40.12
```

If that doesn't work, you can manually copy the key:

1. Copy this public key:
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDveP7Fz/T5ifM+YdfI8SBsFQtYAnmDDY8tleVhuLF92CiyK8iQKsIGD8EWPDGa8As/F5epzPvPFpgavfxx0PZw2Al/YAmECHS9N+k3I5y74yNGHI+lslrgezToZWr7pvLNYHb6Pk9MLDvLIowIbddz2nltno27hS9I6B5taVKFLKuDBP4cN3B9GOedsHzFEJvrtZO4szvEqe63I7eQj1jf9Q9yOVJYwtqMvqOZeyRISXyJYpASJW0RdOtR72aqs4B+REG/POQb4OO2Dpeae+j3WXqrNyggyhHyxzBECwd/vUuko+OzpvVy5Yeik6nTIwEX0MlzKz25LhTh5lU3Qs3sk3AeiAy2r7cvPhBeLSYg3Kt200EiWzm7Tr7hDtm+9Un5xW8fBHPassuiuMlLWvz2jjYeyhpNTWjqt1DPesX/ywUVr9LVjo38EAbKyuecluVSwTDj/MMZ8lgFadPWZLAp1ZLGjL41krspwPlJcKz9TgxaG48bjjkZNFAYM4s/Ky/6g/n5QhM0BKHiqfXznVV+Is7xx7fkVzLdZbIBiEGS3MYX6Wl8CIP5vEh3hUbKqHRebXaNDtUdlAkG/sLp1xH6HgZbE1NYzpHlBbsNOAut/viXCRe9F5B5r7jmt8Mc24ytzRGyE4r6azdmPrHltx/2a+Oq1R2eP5ziX4x8ECy/Cw== setsuna@Setsuna
```

2. SSH to the remote server:
```bash
ssh desidia26@192.168.40.12
```

3. Add the key to authorized_keys:
```bash
mkdir -p ~/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDveP7Fz/T5ifM+YdfI8SBsFQtYAnmDDY8tleVhuLF92CiyK8iQKsIGD8EWPDGa8As/F5epzPvPFpgavfxx0PZw2Al/YAmECHS9N+k3I5y74yNGHI+lslrgezToZWr7pvLNYHb6Pk9MLDvLIowIbddz2nltno27hS9I6B5taVKFLKuDBP4cN3B9GOedsHzFEJvrtZO4szvEqe63I7eQj1jf9Q9yOVJYwtqMvqOZeyRISXyJYpASJW0RdOtR72aqs4B+REG/POQb4OO2Dpeae+j3WXqrNyggyhHyxzBECwd/vUuko+OzpvVy5Yeik6nTIwEX0MlzKz25LhTh5lU3Qs3sk3AeiAy2r7cvPhBeLSYg3Kt200EiWzm7Tr7hDtm+9Un5xW8fBHPassuiuMlLWvz2jjYeyhpNTWjqt1DPesX/ywUVr9LVjo38EAbKyuecluVSwTDj/MMZ8lgFadPWZLAp1ZLGjL41krspwPlJcKz9TgxaG48bjjkZNFAYM4s/Ky/6g/n5QhM0BKHiqfXznVV+Is7xx7fkVzLdZbIBiEGS3MYX6Wl8CIP5vEh3hUbKqHRebXaNDtUdlAkG/sLp1xH6HgZbE1NYzpHlBbsNOAut/viXCRe9F5B5r7jmt8Mc24ytzRGyE4r6azdmPrHltx/2a+Oq1R2eP5ziX4x8ECy/Cw== setsuna@Setsuna" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

## Step 2: Test Connection

After setting up the key, test the connection:
```bash
ssh desidia26@192.168.40.12 'echo "SSH access successful"'
```

## Step 3: Run Remote Deploy Script

Once SSH access is working, you can use the remote deployment script:
```bash
./scripts/remote-deploy.sh
```