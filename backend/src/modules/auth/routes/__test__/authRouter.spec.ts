import app from "../../../../app";
import request  from "supertest";



  describe('POST /signup', () => {
   it('should return 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({
          username: 'validuser',
          email: 'invalid-email',
          password: 'validpass'
        });
      console.log(res);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({
          username: 'validuser',
          email: 'valid@email.com',
          password: 'valid'
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });


    it('should return 201 on successful signup', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({
          username: 'validuser',
          email: 'valid@email.com',
          password: 'validpassword'
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name', 'validuser');
    })


     it('should return 400 on exist user', async () => {
      const res = await request(app)
        .post('/users/signup')
        .send({
          username: 'validuser',
          email: 'valid@email.com',
          password: 'validpassword'
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email in use');
    })

  });

describe('POST /user/signin', () => {
    const email = 'usuario@example.com';
    const password = 'senha123';

  beforeEach(async () => {
    // Criar o usuário antes do teste de login
    await request(app)
      .post('/user/signup')
      .send({
        name: 'Usuário Teste',
        email,
        password
      });
  });

  it('should return 200 and token on successful signin', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'usuario@example.com',
        password: 'senha123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login realizado com sucesso');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 if email is invalid', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'email-invalido',
        password: 'senha123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'usuario@example.com'
        // password faltando
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 401 if credentials are invalid', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'usuario@example.com',
        password: 'senhaErrada'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

});


