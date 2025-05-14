import 'package:flutter/material.dart';

class FormLoginStudente extends StatefulWidget {
  const FormLoginStudente({super.key});

  @override
  State<FormLoginStudente> createState() => _FormLoginStudenteState();
}

class _FormLoginStudenteState extends State<FormLoginStudente> {
  TextEditingController emailText = TextEditingController();
  TextEditingController passwordText = TextEditingController();

  void TryToLog() {
    //fare login cookie dio
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
            child: Column(
      children: [
        const Padding(padding: EdgeInsets.all(40)),
        const Text(
          'Login',
          style: TextStyle(
            fontSize: 40,
            fontWeight: FontWeight.bold,
          ),
        ),
        const Padding(padding: EdgeInsets.all(65)),
        SizedBox(
          width: 200,
          child: TextField(
            controller: emailText,
            decoration: const InputDecoration(
              labelText: 'Input your email',
              hintText: 'example@something.xxx',
              border: OutlineInputBorder(),
            ),
          ),
        ),        
        const Padding(padding: EdgeInsets.all(10)),
        SizedBox(
          width: 200,
          child: TextField(
            controller: passwordText,
            obscureText: true,
            decoration: const InputDecoration(
              labelText: 'Input your password',
              hintText: '12345',
              border: OutlineInputBorder(),
            ),
          ),
        ),
        const Padding(padding: EdgeInsets.all(80)),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            //ElevatedButton(onPressed: TryToLog(), child: const Text('Login')),
            const Padding(padding: EdgeInsets.all(10)),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/formregistrazionestudente');
                },
                child: const Text('Non sei registrato? Registrati!'))
          ],
        )
      ],
    )));
  }
}
