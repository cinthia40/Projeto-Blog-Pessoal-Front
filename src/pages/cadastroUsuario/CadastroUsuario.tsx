import React, { useState, useEffect, ChangeEvent } from 'react';
import './CadastroUsuario.css'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { cadastroUsuario } from '../../services/Service';
import User from '../../models/User';
import { toast } from 'react-toastify';

function CadastroUsuario() {
    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })
    useEffect(() => {
        if (userResult.id != 0) {
            navigate('/login')
        }
    }, [userResult])
    
    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        toast.success('Usuario cadastrado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
            });
        }else{
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
                });
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
                <Box className='formulario' paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography className='entrar' variant='h3' gutterBottom color='textPrimary' component='h3' align='center'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Link to='/login' className='text-decorator-none'>
                                <Button variant='contained' color='secondary' className='btnCancelar' style={{ fontWeight: 'bold' }}>Cancelar</Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary' style={{ fontWeight: 'bold' }}>Cadastrar</Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>);
}

export default CadastroUsuario