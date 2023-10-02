import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import AnimalService from '../services/animal.service'
import Icon from 'react-native-vector-icons/Ionicons';
import { Animal } from '../models/animal.model';
import { ImageBackground } from 'react-native';
export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.findAllAnimal()        
    }

    state = {
        data: [],
        value: null,
        onChangeText: null,
        dataId: null,
        dataInsert:null
    }

    //acionado quando o componente e montado
    componentDidMount () {
        this.findAllAnimal ();
      }

      //escuta atualizações na lista
      componentDidUpdate (prevProps, prevState) {
        if (prevState.data !== this.state.data) {
          this.findAllAnimal ();
        }
      }
   
    deleteAnimal=(id)=> {
        this.findAnimalById(id)
        if (this.state.dataId != null || this.state.dataId != undefined) {
            AnimalService.deleteById(id)
            alert("animal excluido com sucesso: ")
        }
    }

    insertAnimal=(item)=> {
        let file:Animal=new Animal()
        file.nome=item

        const insertId=AnimalService.addData(file);
        if(insertId==null || insertId==undefined){
            alert("Não foi possivel inserir o novo animal")
        }
    }

    findAllAnimal=()=> {
        AnimalService.findAll()
            .then((response: any) => {
                this.setState({
                    data: response._array,
                    isLoading: false,
                })
            }), (error) => {
                console.log(error);
            }
    }
    findAnimalById=(id)=> {
        AnimalService.findById(id)
            .then((response: any) => {
                if (response._array.length >0 && response!= null && response!= undefined) {
                    this.setState({
                        dataId: response._array[0]
                    })
                } else {
                    alert("id não encontrado")
                }
            }), (error) => {
                console.log(error);
            }
    }
    render() {

       
        const {data,value,dataInsert} = this.state;
        
        const animalList = data.map((item, key) => {
            return (
                <>
                    <Text >id:{item.id}      nome:{item.nome}</Text>
                </>
            )
        })

        return (
      
            <View style={styles.container}>
   
                         <Text style={{ fontSize: 30, paddingBottom: 20, fontWeight:'bold' }}>Lista de Animais</Text>
                <TextInput
                    placeholder="Digite o id"
                    style={styles.textInput}
                    onChangeText={text => { this.setState({ value: text }) }}
                    value={value}
                />
               <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { value == null ? alert("O campo de id não pode ser vazio") : this.deleteAnimal(value) }} style={{ alignItems: "center", backgroundColor: 'red', borderRadius:10, padding:8 }}>
                        <Icon name="trash-bin" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Digite o nome do novo animal"
                    style={styles.textInput}
                    onChangeText={textAdd => { this.setState({ dataInsert: textAdd }) }}
                    value={dataInsert}
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  dataInsert == null ? alert("O campo de nome não pode ser vazio") :this.insertAnimal(dataInsert)} style={{ alignItems: "center", backgroundColor: 'green', borderRadius:10, padding:4 }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {animalList}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8BFD8',
        alignItems: 'center',
        justifyContent: 'center',
        
       
    },

    textInput:{
        alignItems: "center", 
        textAlign: "center",
        width: 200, 
        height: 40, 
        borderColor: 'black', 
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor:'#FFF0F5'
    },
    containerTouch:{
        width: 100,
         padding: 10,
         marginBottom:20
        
    },
   
});