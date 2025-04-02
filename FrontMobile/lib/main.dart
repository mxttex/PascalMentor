import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:cool_alert/cool_alert.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:crypto/crypto.dart';

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
        '/': (context) => const LoginPage(title: 'NM Chat'),
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

//la pagina principale che viene selezionata quando si seleziona la modalità 'studente'
class MainStudente extends StatefulWidget {
  const MainStudente({super.key});

  @override
  State<MainStudente> createState() => _MainStudenteState();
}

class _MainStudenteState extends State<MainStudente> {
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
                'Studente',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Padding(padding: EdgeInsets.only(top: 100.0, bottom: 75.0)),
              ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/formregistrazionestudente');
                  },
                  child: const Text('Registrati')),
              ElevatedButton(onPressed: () {}, child: const Text('Login')),
            ],
          ),
        ));
  }
}

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

class FormRegistrazioneStudente extends StatefulWidget {
  const FormRegistrazioneStudente({super.key});

  @override
  State<FormRegistrazioneStudente> createState() =>
      _FormRegistrazioneStudenteState();
}

class _FormRegistrazioneStudenteState extends State<FormRegistrazioneStudente> {
  TextEditingController firstNameText = TextEditingController();
  TextEditingController lastNameText = TextEditingController();
  TextEditingController emailText = TextEditingController();
  TextEditingController pswText = TextEditingController();
  TextEditingController confirmPasswordText = TextEditingController();
  TextEditingController dataDiNascitaText = TextEditingController();
  DateTime _selectedDate = DateTime.now();
  TextEditingController indirizzoText = TextEditingController();
  String _selectedIndirizzo = 'Informatica';
  final List<String> _options = ['Informatica', 'Automazione', 'Biotecnologie'];

  @override
  void dispose() {
    firstNameText.dispose();
    lastNameText.dispose();
    emailText.dispose();
    pswText.dispose();
    confirmPasswordText.dispose();
    dataDiNascitaText.dispose();
    indirizzoText.dispose();

    super.dispose();
  }

  Future<void> _pickDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(1900, 1),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
        dataDiNascitaText.text = DateFormat('yyyy-MM-dd').format(picked);
      });
    }
  }

  //method to encrypt in sha1 hash function
  Digest sha1encrypt(element) {
    var bytes = utf8.encode(element);

    return sha1.convert(bytes);
  }

  void confermaInvioDati() async {
    if (firstNameText.text == '' ||
        lastNameText.text == '' ||
        emailText.text == '' ||
        pswText.text == '' ||
        confirmPasswordText.text == '' ||
        pswText.text != confirmPasswordText.text ||
        dataDiNascitaText.text == '') {
      CoolAlert.show(
          context: context,
          type: CoolAlertType.error,
          title: "Errore",
          text: "ricontrolla i tuoi dati.");
      return;
    }
    CoolAlert.show(
        context: context,
        type: CoolAlertType.confirm,
        title: "Conferma",
        text: "la registrazione è avvenuta con successo.");
    //nome,cognome,email,password,indirizzo,dataNascita
    var message = {
      'nome': firstNameText.text,
      'cognome': lastNameText.text,
      'email': emailText.text,
      'password': sha1encrypt(pswText.text).toString(),
      'indirizzo': _selectedIndirizzo,
      'dataNascita': dataDiNascitaText.text
    };

    try {
      await http.post(
          Uri.parse('http://192.168.189.83:8089/api/registerStudent'),
          headers: {'Content-type': 'application/json'},
          body: jsonEncode(message));

      //Navigator.pushNamed(context, 'pagg');
    } catch (exception) {
      if (mounted) {
        CoolAlert.show(
            context: context,
            type: CoolAlertType.success,
            text: exception.toString());
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(Icons.arrow_back)),
          title: const Text("Registrazione Studente"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              //first name
              SizedBox(
                width: 200,
                child: TextField(
                  controller: firstNameText,
                  decoration: const InputDecoration(
                    labelText: 'Input your first name',
                    hintText: 'Matteo',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //last name
              SizedBox(
                width: 200,
                child: TextField(
                  controller: lastNameText,
                  decoration: const InputDecoration(
                    labelText: 'Input your last name',
                    hintText: 'Faccetta',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //email
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
              //password
              SizedBox(
                width: 200,
                child: TextField(
                  controller: pswText,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Input your password',
                    hintText: '12345',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //confirming password
              SizedBox(
                width: 200,
                child: TextField(
                  controller: confirmPasswordText,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Confirm you password',
                    hintText: '*****',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //dataDiNascita
              SizedBox(
                width: 200,
                child: TextField(
                  controller: dataDiNascitaText,
                  readOnly: true,
                  decoration: const InputDecoration(
                    labelText: 'Date of Birth',
                    hintText: 'Select your date of birth',
                    border: OutlineInputBorder(),
                  ),
                  onTap: () {
                    _pickDate(context);
                  },
                ),
              ),
              //Indirizzo
              SizedBox(
                width: 200,
                child: DropdownButtonFormField<String>(
                  decoration: const InputDecoration(
                    labelText: 'Choose an option',
                    border: OutlineInputBorder(),
                  ),
                  value: _selectedIndirizzo,
                  items: _options.map((option) {
                    return DropdownMenuItem<String>(
                      value: option,
                      child: Text(option),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() {
                      _selectedIndirizzo = newValue!;
                    });
                  },
                ),
              ),
              //bottone di conferma
              ElevatedButton(
                onPressed: confermaInvioDati,
                child: const Text('Register'),
              )
            ],
          ),
        ));
  }
}

class FormLoginStudente extends StatefulWidget {
  const FormLoginStudente({super.key});

  @override
  State<FormLoginStudente> createState() => _FormLoginStudenteState();
}

class _FormLoginStudenteState extends State<FormLoginStudente> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(Icons.arrow_back)),
          title: const Text("Login Studente"),
        ),
        body: const Center());
  }
}

class FormRegistrazioneInsegnante extends StatefulWidget {
  const FormRegistrazioneInsegnante({super.key});

  @override
  State<FormRegistrazioneInsegnante> createState() =>
      _FormRegistrazioneInsegnanteState();
}

class _FormRegistrazioneInsegnanteState
    extends State<FormRegistrazioneInsegnante> {
  TextEditingController firstNameText = TextEditingController();
  TextEditingController lastNameText = TextEditingController();
  TextEditingController emailText = TextEditingController();
  TextEditingController pswText = TextEditingController();
  TextEditingController confirmPasswordText = TextEditingController();
  TextEditingController dataDiNascitaText = TextEditingController();
  DateTime _selectedDate = DateTime.now();

  @override
  void dispose() {
    firstNameText.dispose();
    lastNameText.dispose();
    emailText.dispose();
    pswText.dispose();
    confirmPasswordText.dispose();
    dataDiNascitaText.dispose();

    super.dispose();
  }

  Future<void> _pickDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(1900, 1),
      lastDate: DateTime.now(),
    );

    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
        dataDiNascitaText.text = DateFormat('yyyy-MM-dd').format(picked);
      });
    }
  }

  //method to encrypt in sha1 hash function
  Digest sha1encrypt(element) {
    var bytes = utf8.encode(element);

    return sha1.convert(bytes);
  }

  void confermaInvioDati() async {
    if (firstNameText.text == '' ||
        lastNameText.text == '' ||
        emailText.text == '' ||
        pswText.text == '' ||
        confirmPasswordText.text == '' ||
        pswText.text != confirmPasswordText.text ||
        dataDiNascitaText.text == '') {
      CoolAlert.show(
          context: context,
          type: CoolAlertType.error,
          title: "Errore",
          text: "ricontrolla i tuoi dati.");
      return;
    }
    CoolAlert.show(
        context: context,
        type: CoolAlertType.confirm,
        title: "Conferma",
        text: "la registrazione è avvenuta con successo.");
    //nome,cognome,email,password,indirizzo,dataNascita
    var message = {
      'nome': firstNameText.text,
      'cognome': lastNameText.text,
      'email': emailText.text,
      'password': sha1encrypt(pswText.text).toString(),
      'dataNascita': dataDiNascitaText.text
    };

    try {
      await http.post(
          Uri.parse('http://192.168.189.83:8089/api/registerTeacher'),
          headers: {'Content-type': 'application/json'},
          body: jsonEncode(message));
      
      //Navigator.pushNamed(context, 'pagg');
    } catch (exception) {
      if (mounted) {
        CoolAlert.show(
            context: context,
            type: CoolAlertType.success,
            text: exception.toString());
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: const Icon(Icons.arrow_back)),
          title: const Text("Registrazione Insegnante"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              //first name
              SizedBox(
                width: 200,
                child: TextField(
                  controller: firstNameText,
                  decoration: const InputDecoration(
                    labelText: 'Input your first name',
                    hintText: 'Matteo',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //last name
              SizedBox(
                width: 200,
                child: TextField(
                  controller: lastNameText,
                  decoration: const InputDecoration(
                    labelText: 'Input your last name',
                    hintText: 'Faccetta',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //email
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
              //password
              SizedBox(
                width: 200,
                child: TextField(
                  controller: pswText,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Input your password',
                    hintText: '12345',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //confirming password
              SizedBox(
                width: 200,
                child: TextField(
                  controller: confirmPasswordText,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Confirm you password',
                    hintText: '*****',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              //dataDiNascita
              SizedBox(
                width: 200,
                child: TextField(
                  controller: dataDiNascitaText,
                  readOnly: true,
                  decoration: const InputDecoration(
                    labelText: 'Date of Birth',
                    hintText: 'Select your date of birth',
                    border: OutlineInputBorder(),
                  ),
                  onTap: () {
                    _pickDate(context);
                  },
                ),
              ),
              //bottone di conferma
              ElevatedButton(
                onPressed: confermaInvioDati,
                child: const Text('Register'),
              )
            ],
          ),
        ));
  }
}