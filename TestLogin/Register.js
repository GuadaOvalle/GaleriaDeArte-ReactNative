import React, { useState } from 'react';
import {  
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert, } from 'react-native';

    const Separator = () => <View style={styles.separator} />;

    const TextInANest = () => {
        const [titleText, setTitleText] = useState("Bienvenido");
    ;}

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        
        console.log('Registrando:', email, password);
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Registrar" onPress={handleRegister} />

            <TouchableOpacity onPress={() => console.log('Olvidaste tu contraseña')}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
                
            <TouchableOpacity onPress={() => console.log('Ir a Login')}>
                <Text style={styles.link}>¿Ya tienes cuenta? Ingresa aquí</Text>
            </TouchableOpacity>

        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

    styles = StyleSheet.create({
        
        titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        },

    });

export default Registro;