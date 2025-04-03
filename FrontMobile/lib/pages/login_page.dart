import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            body: Center(
                child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Padding(padding: EdgeInsets.only(top: 40.0)),
        const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Choose your role',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            )
          ],
        ),
        const Padding(padding: EdgeInsets.only(top: 100.0, bottom: 75.0)),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/mainstudente');
              },
              style: const ButtonStyle(
                backgroundColor: WidgetStatePropertyAll<Color>(
                    Color.fromARGB(255, 255, 139, 139)),
              ),
              child: const Text('Studente'),
            ),
            const Padding(padding: EdgeInsets.only(left: 20.0, right: 20.0)),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/maininsegnante');
              },
              style: const ButtonStyle(
                backgroundColor: WidgetStatePropertyAll<Color>(
                    Color.fromARGB(255, 139, 241, 255)),
              ),
              child: const Text('Insegnante'),
            ),
          ],
        )
      ],
    ))));
  }
}