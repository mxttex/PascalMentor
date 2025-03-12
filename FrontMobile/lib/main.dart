import 'package:flutter/material.dart';

void main() {
  runApp(const SimpleChat());
}

class SimpleChat extends StatelessWidget {
  const SimpleChat({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Chat',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
        useMaterial3: true,
      ),
      home: const LoginPage(title: 'NM Chat'),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.title});

  final String title;

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
                        Text('Choose your role', style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold,),)
                      ],
                    ),
                    const Padding(padding: EdgeInsets.only(top: 100.0, bottom: 75.0)),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ElevatedButton(onPressed: () {},  style: const ButtonStyle(backgroundColor:  WidgetStatePropertyAll<Color>(Color.fromARGB(255, 255, 139, 139)),), child: const Text('Studente'),),
                        const Padding(padding:EdgeInsets.only(left:20.0, right:20.0)),
                        ElevatedButton(onPressed: () {},  style: const ButtonStyle(backgroundColor:  WidgetStatePropertyAll<Color>(Color.fromARGB(255, 139, 241, 255)),), child: const Text('Insegnante'),),
                      ],
                    )
                  ],
    ))));
  }
}
