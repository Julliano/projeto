// Configurar o Setup da App:

//Chamadas dos pacotes:
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Curso = require('./app/models/curso');
var Aluno = require('./app/models/aluno');
var Matricula = require('./app/models/matricula');
mongoose.Promise = global.Promise;

//URI: MLab
//mongoose.connect('mongodb://jvolpato:julliano123@ds064188.mlab.com:64188/node-crud-api', {
//    useMongoClient: true
//});

//Maneira Local: MongoDb:
mongoose.connect('mongodb://localhost:27017/node-crud-api', {
    useMongoClient: true
});

//Configuração da variável app para usar o 'bodyParser()':
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Definindo a porta onde será executada a nossa api:
var port = process.env.port || 8000;

//Rotas da nossa API:
//=============================================================================

//Criando uma instância das Rotas via Express:
var router = express.Router();

//Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão:
router.use(function(req, res, next) {
//    console.log('Algo está acontecendo aqui....');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

//Rota de Teste para sabermos se tudo está realmente funcionando (acessar através: GET: http://localhost:8000/api): 
router.get('/', function(req, res) {
    res.json({ message: 'Beleza! Bem vindo(a) a nossa Loja XYZ' })
});

//API's:
//==============================================================================


//Rotas que terminarem com '/matriculas' (servir: GET ALL & POST)
//router.route('/matriculas')

	/* 1) Método: Selecionar Todas as Matriculas (acessar em: GET http://localhost:8000/api/matriculas)  */
	router.get("/matriculas", (req, res, next) => {
		Matricula.find()
		.populate('aluno', 'nome')
		.populate('curso', 'titulo')
		.then(matriculas => {
			res.status(200).json({data:matriculas})
		})
	})
//	.get(function(req, res) {
//	    Matricula.find(function(error, matriculas) {
//	        if(error) 
//	            res.send('Erro ao tentar Selecionar Todas as matriculas...: ' + error);
//	
//	        res.json({data:matriculas});
//	    });
//	});

	router.route('/matriculas/add')
	/* 2) Método: Criar Matricula (acessar em: POST http://localhost:8000/api/matriculas/add)  */
	.post(function(req, res) {
		var matricula = new Matricula();
		
		//Aqui vamos setar os campos da matricula (via request):
		matricula.aluno = req.body.aluno;
		matricula.curso = req.body.curso;
		
		matricula.save(function(error) {
			if(error)
				res.send('Erro ao tentar salvar a Matricula....: ' + error);
			
			Matricula.find({})
				.populate('aluno')
				.populate('curso')
				.exec(function(error, matriculas) {
	                console.log(JSON.stringify(matriculas, null, "\t"))
	            })
				res.json({ message: 'Matricula realizada com Sucesso!' });
		});
	})
	
	
	//Rotas que irão terminar em '/matriculas/:matricula_id' (servir tanto para: GET, PUT & DELETE: id):
    router.route('/matriculas/:matricula_id')
	
    /* 3) Método: Excluir por Id (acessar: http://localhost:8000/api/matriculas/:matricula_id) */
        .delete(function(req, res) {
            
        Matricula.remove({
            _id: req.params.matricula_id
            }, function(error) {
                if (error) 
                    res.send("Id da matricula não encontrado....: " + error);

                res.json({ message: 'Matricula Excluído com Sucesso!' });
            });
        });
	
//Rotas que terminarem com '/cursos' (servir: GET ALL & POST)
router.route('/cursos')

    /* 1) Método: Selecionar Todos Cursos (acessar em: GET http://localhost:8000/api/cursos)  */
    .get(function(req, res) {
        Curso.find(function(error, cursos) {
            if(error) 
                res.send('Erro ao tentar Selecionar Todos os cursos...: ' + error);

            res.json({data:cursos});
        });
    });

	
	router.route('/cursos/add')
	/* 2) Método: Criar Curso (acessar em: POST http://localhost:8000/api/cursos)  */
		.post(function(req, res) {
			var curso = new Curso();
			
			//Aqui vamos setar os campos do curso (via request):
			curso.titulo = req.body.titulo;
			curso.descricao = req.body.descricao;
			
			curso.save(function(error) {
				if(error)
					res.send('Erro ao tentar salvar o Curso....: ' + error);
				
				res.json({ message: 'Curso Cadastrado com Sucesso!' });
			});
		})

    //Rotas que irão terminar em '/cursos/:curso_id' (servir tanto para: GET, PUT & DELETE: id):
    router.route('/cursos/:curso_id')

    /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/cursos/:curso_id) */
    .get(function (req, res) {
        
        //Função para poder Selecionar um determinado curso por ID - irá verificar se caso não encontrar um detemrinado
        //curso pelo id... retorna uma mensagem de error:
        Curso.findById(req.params.curso_id, function(error, curso) {
            if(error)
                res.send('Id do Curso não encontrado....: ' + error);

            res.json({data:curso});
        });
    })

    /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/cursos/:curso_id) */
    .put(function(req, res) {

        //Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Curso':
        Curso.findById(req.params.curso_id, function(error, curso) {
            if (error) 
                res.send("Id do Curso não encontrado....: " + error);

                //Segundo: 
            	curso.titulo = req.body.titulo;
            	curso.descricao = req.body.descricao;

                //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
                curso.save(function(error) {
                    if(error)
                        res.send('Erro ao atualizar o curso....: ' + error);

                    res.json({ message: 'Curso atualizado com sucesso!' });
                });
            });
        })

        /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/cursos/:curso_id) */
        .delete(function(req, res) {
            
            Curso.remove({
                _id: req.params.curso_id
                }, function(error) {
                    if (error) 
                        res.send("Id do Curso não encontrado....: " + error);

                    res.json({ message: 'Curso Excluído com Sucesso!' });
                });
            });

//Rotas que terminarem com '/alunos' (servir: GET ALL & POST)
    router.route('/alunos')
    
    /* 1) Método: Selecionar Todos Alunos (acessar em: GET http://localhost:8000/api/alunos)  */
    .get(function(req, res) {
    	Aluno.find(function(error, alunos) {
    		if(error) 
    			res.send('Erro ao tentar Selecionar Todos os alunos...: ' + error);
    		
    		res.json({data:alunos});
    	});
    });
    
    router.route('/alunos/add')
    
    /* 2) Método: Criar Curso (acessar em: POST http://localhost:8000/api/alunos)  */
    .post(function(req, res) {
    	var aluno = new Aluno();
    	
    	//Aqui vamos setar os campos do aluno (via request):
    	aluno.nome = req.body.nome;
    	aluno.email = req.body.email;
    	aluno.nascimento = req.body.nascimento;
    	
    	aluno.save(function(error) {
    		if(error)
    			res.send('Erro ao tentar salvar o Aluno....: ' + error);
    		
    		res.json({ message: 'Aluno Cadastrado com Sucesso!' });
    	});
    })
    
    
    //Rotas que irão terminar em '/alunos/:aluno_id' (servir tanto para: GET, PUT & DELETE: id):
    router.route('/alunos/:aluno_id')
    
    /* 3) Método: Selecionar por Id: (acessar em: GET http://localhost:8000/api/alunos/:aluno_id) */
    .get(function (req, res) {
    	
    	//Função para poder Selecionar um determinado aluno por ID - irá verificar se caso não encontrar um detemrinado
    	//aluno pelo id... retorna uma mensagem de error:
    	Aluno.findById(req.params.aluno_id, function(error, aluno) {
    		if(error)
    			res.send('Id do Aluno não encontrado....: ' + error);
    		
    		res.json(aluno);
    	});
    })
    
    /* 4) Método: Atualizar por Id: (acessar em: PUT http://localhost:8000/api/alunos/:aluno_id) */
    .put(function(req, res) {
    	
    	//Primeiro: para atualizarmos, precisamos primeiro achar 'Id' do 'Aluno':
    	Aluno.findById(req.params.aluno_id, function(error, aluno) {
    		if (error) 
    			res.send("Id do Aluno não encontrado....: " + error);
    		
    		//Segundo: 
    		aluno.nome = req.body.nome;
        	aluno.email = req.body.email;
        	aluno.nascimento = req.body.nascimento;
    		
    		//Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
    		aluno.save(function(error) {
    			if(error)
    				res.send('Erro ao atualizar o aluno....: ' + error);
    			
    			res.json({ message: 'Aluno atualizado com sucesso!' });
    		});
    	});
    })
    
    /* 5) Método: Excluir por Id (acessar: http://localhost:8000/api/alunos/:aluno_id) */
    .delete(function(req, res) {
    	
    	Aluno.remove({
    		_id: req.params.aluno_id
    	}, function(error) {
    		if (error) 
    			res.send("Id do Aluno não encontrado....: " + error);
    		
    		res.json({ message: 'Aluno Excluído com Sucesso!' });
    	});
    });


//Definindo um padrão das rotas prefixadas: '/api':
app.use('/api', router);

//Iniciando a Aplicação (servidor):
app.listen(port);
console.log("Iniciando a app na porta " + port);