import 'package:flutter/material.dart';

import 'pages/login_page.dart';

import 'pages/studentPages/main_studente.dart';
import 'pages/studentPages/form_registrazione_studente.dart';

import 'pages/teacherPages/main_insegnante.dart';
import 'pages/teacherPages/form_registrazione_insegnante.dart';

void main() {
  runApp(const SimpleChat());
}

class SimpleChat extends StatelessWidget {
  const SimpleChat({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginPage(),
        '/mainstudente': (context) => const MainStudente(),
        '/maininsegnante': (context) => const MainInsegnante(),
        '/formregistrazionestudente': (context) =>
            const FormRegistrazioneStudente(),
        '/formloginstudente': (context) => const FormLoginStudente(),
        '/formregistrazioneinsegnante': (context) =>
            const FormRegistrazioneInsegnante(),
      },
      title: 'Flutter Chat',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
        useMaterial3: true,
      ),
    );
  }
}