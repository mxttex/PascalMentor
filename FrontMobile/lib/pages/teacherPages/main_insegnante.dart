import 'package:flutter/material.dart';

//la pagina principale che viene selezionata quando si seleziona la modalità 'insegnante'
class MainInsegnante extends StatefulWidget {
  const MainInsegnante({super.key});

  @override
  State<MainInsegnante> createState() => _MainInsegnanteState();
}

class _MainInsegnanteState extends State<MainInsegnante> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(Icons.arrow_back)),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Insegnante',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Padding(padding: EdgeInsets.only(top: 100.0, bottom: 75.0)),
              ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(
                        context, '/formregistrazioneinsegnante');
                  },
                  child: const Text('Registrati')),
              ElevatedButton(onPressed: () {}, child: const Text('Login')),
            ],
          ),
        ));
  }
}
