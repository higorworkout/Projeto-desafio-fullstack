import app from "../../../../app";
import request  from "supertest";

describe('Get User Profile', () => {
  const email = 'perfil@example.com';
  const password = 'teste123';
  let token: string;

  beforeEach(async () => {
    // Criar usuário
    await request(app)
      .post('/user/signup')
      .send({
        name: 'Perfil Teste',
        email,
        password
      });

    // Fazer login para obter token
    const loginResponse = await request(app)
      .post('/user/signin')
      .send({ email, password });

    token = loginResponse.body.token;
  });

  it('deve retornar o perfil do usuário autenticado', async () => {
    const response = await request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Perfil Teste');
    expect(response.body).toHaveProperty('email', email);
    expect(response.body).not.toHaveProperty('password');
  });

  it('deve retornar erro se token JWT não for enviado', async () => {
    const response = await request(app)
      .get('/user/profile');

    expect(response.status).toBe(401); // ou 403 dependendo do seu middleware
    expect(response.body).toHaveProperty('message');
  });

  it('deve retornar erro se token JWT for inválido', async () => {
    const response = await request(app)
      .get('/user/profile')
      .set('Authorization', 'Bearer token-falso');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});

describe('PUT /users/profile', () => {
  let token: string;

  beforeEach(async () => {
   
    // Cria um usuário
    await request(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    // Faz login
    const res = await request(app)
      .post('/users/signin')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    token = res.body.token;
  });

  it('deve atualizar o usuário com sucesso', async () => {
    const res = await request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'newpassword123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Usuário atualizado com sucesso');
    expect(res.body.user.email).toBe('updated@example.com');
    expect(res.body.user.name).toBe('Updated Name');
  });

  it('deve retornar 401 se o token não for enviado', async () => {
    const res = await request(app)
      .put('/users/profile')
      .send({
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'newpassword123',
      });

    expect(res.status).toBe(401);
  });

  it('deve retornar erro se o email for inválido', async () => {
    const res = await request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Name',
        email: 'email-inválido',
        password: 'newpassword123',
      });

    expect(res.status).toBe(400); // ou o status que você usa para validação
  });
});