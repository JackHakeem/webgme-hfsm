/* Generated file based on ejs templates */
define([], function() {
    return {
    "c++.bat.ejs": "echo off\r\nif defined VS140COMNTOOLS (\r\n    set \"COMNTOOLS=%VS140COMNTOOLS%\"\r\n) else if defined VS120COMNTOOLS (\r\n    set \"COMNTOOLS=%VS120COMNTOOLS%\"\r\n) else if defined VS110COMNTOOLS (    \r\n    set \"COMNTOOLS=%VS110COMNTOOLS%\"\r\n) else if defined VS100COMNTOOLS (\r\n    set \"COMNTOOLS=%VS100COMNTOOLS%\"\r\n) else (\r\n    echo \"Visual studio was not found\"\r\n)\r\nif defined COMNTOOLS (\r\n    REM add visual studio environment variables\r\n    echo \"%COMNTOOLS%\"\r\n    call \"%COMNTOOLS%..\\..\\VC\\vcvarsall.bat\" x86\r\n    \r\n    REM compile\r\n    cl Program.cpp -o Program.exe\r\n    REM execute\r\n    Program.exe\r\n)",
    "c++.generated.cpp.ejs": "// Generated from:\r\n//\r\n//\r\n<%\r\nvar i, j,\r\n        outerIf = 'if',\r\n        innerIf = 'if',\r\n        initialStateName;\r\n\r\nfor (i = 0; i < stateMachine.states.length; i += 1) {\r\n    if (stateMachine.states[i].id === stateMachine.initialState) {\r\n        initialStateName = stateMachine.states[i].name;\r\n        break;\r\n    }\r\n}\r\n\r\n%>\r\n#include <iostream>\r\n#include <string>\r\n#include <set>\r\n\r\n\r\nint main(int argc, char** argv)\r\n{\r\n    std::cout << \"State machine for <%=stateMachine.name%>. Type 'exit' to exit the program any time.\" << std::endl;\r\n\r\n    std::set<std::string> finalStates;\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>    finalStates.insert(\"<%=stateMachine.finalStates[i]%>\");\r\n<%}%>\r\n\r\n    std::string currentStateId = \"<%=stateMachine.initialState%>\";\r\n    std::string currentState = \"<%=initialStateName%>\";\r\n    \r\n    std::string currentInput = \"\";\r\n    while (strcmp(currentInput.c_str(), \"exit\"))\r\n    {\r\n        std::cout << \"Current state: '\" << currentState << \" (\" << currentStateId << \")\" << std::endl;\r\n        std::cout << \"Enter an event: \";\r\n        std::getline(std::cin, currentInput);\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\n    innerIf = 'if';%>        <%=outerIf%> (currentStateId == \"<%=stateMachine.states[i].id%>\")\r\n        {\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n    var transition = stateMachine.states[i].transitions[j];\r\n    eventStr += ', ' + transition.event;\r\n%>            <%=innerIf%> (currentInput == \"<%=transition.event%>\")\r\n            {\r\n                std::cout << \"Switching state to <%=transition.targetName%> (<%=transition.targetId%>)\" << std::endl;\r\n                currentStateId = \"<%=transition.targetId%>\";\r\n                currentState = \"<%=transition.targetName%>\";\r\n            }<%if (j === stateMachine.states[i].transitions.length - 1) {%>\r\n            else\r\n            {\r\n                std::cout << \"Possible events for transition(s): <%=eventStr.substring(2)%>\" << std::endl;\r\n            }<%}%>\r\n<%innerIf = 'else if';}%>\r\n        }\r\n<%outerIf = 'else if';}%>\r\n        // Break the loop at a final state.\r\n        if (finalStates.find(currentStateId) != finalStates.end())\r\n        {\r\n            std::cout << \"At a final state \" << currentState << \" (\" << currentStateId << \")\" << std::endl;\r\n            break;\r\n        }\r\n    }\r\n    std::cout << \"Press enter to exit\" << std::endl;\r\n    std::getline(std::cin, currentInput);\r\n\r\n    return 0;\r\n}",
    "csharp.bat.ejs": "echo off\r\nif defined VS140COMNTOOLS (\r\n    set \"COMNTOOLS=%VS140COMNTOOLS%\"\r\n) else if defined VS120COMNTOOLS (\r\n    set \"COMNTOOLS=%VS120COMNTOOLS%\"\r\n) else if defined VS110COMNTOOLS (    \r\n    set \"COMNTOOLS=%VS110COMNTOOLS%\"\r\n) else if defined VS100COMNTOOLS (\r\n    set \"COMNTOOLS=%VS100COMNTOOLS%\"\r\n) else (\r\n    echo \"Visual studio was not found\"\r\n)\r\nif defined COMNTOOLS (\r\n    REM add visual studio environment variables\r\n    echo \"%COMNTOOLS%\"\r\n    call \"%COMNTOOLS%..\\..\\VC\\vcvarsall.bat\" x86\r\n    \r\n    REM compile\r\n    csc Program.cs /out:Program.exe\r\n    REM execute\r\n    Program.exe\r\n)",
    "csharp.generated.cs.ejs": "// Generated from:\r\n//\r\n//\r\n<%\r\nvar i, j,\r\n    outerIf = 'if',\r\n    innerIf = 'if',\r\n    initialStateName;\r\n\r\n    for (i = 0; i < stateMachine.states.length; i += 1) {\r\n        if (stateMachine.states[i].id === stateMachine.initialState) {\r\n            initialStateName = stateMachine.states[i].name;\r\n            break;\r\n        }\r\n    }\r\n\r\n%>\r\nusing System;\r\nusing System.Collections.Generic;\r\n\r\nnamespace FSM\r\n{\r\n    public class Program\r\n    {\r\n        public static void Main(string[] args)\r\n        {\r\n            System.Console.WriteLine(\"State machine for <%=stateMachine.name%>. Type 'exit' to exit the program any time.\");\r\n\r\n            List<string> finalStates = new List<string>();\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>            finalStates.Add(\"<%=stateMachine.finalStates[i]%>\");\r\n<%}%>\r\n            string currentStateId = \"<%=stateMachine.initialState%>\";\r\n            string currentState = \"<%=initialStateName%>\";\r\n\r\n            string currentInput = \"\";\r\n            while (currentInput != \"exit\")\r\n            {\r\n                System.Console.WriteLine(\"Current state: {0} ({1})\", currentState, currentStateId);\r\n                System.Console.Write(\"Enter an event: \");\r\n                currentInput = System.Console.ReadLine();\r\n\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\n    innerIf = 'if';%>                <%=outerIf%> (currentStateId == \"<%=stateMachine.states[i].id%>\")\r\n                {\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n    var transition = stateMachine.states[i].transitions[j];\r\n    eventStr += ', ' + transition.event;\r\n%>                    <%=innerIf%> (currentInput == \"<%=transition.event%>\")\r\n                    {\r\n                        System.Console.WriteLine(\"Switching state to <%=transition.targetName%> (<%=transition.targetId%>)\");\r\n                        currentStateId = \"<%=transition.targetId%>\";\r\n                        currentState = \"<%=transition.targetName%>\";\r\n                    }<%if (j === stateMachine.states[i].transitions.length - 1) {%>\r\n                    else\r\n                    {\r\n                        System.Console.WriteLine(\"Possible events for transition(s): <%=eventStr.substring(2)%>\");\r\n                    }<%}%>\r\n<%innerIf = 'else if';}%>\r\n                }\r\n<%outerIf = 'else if';}%>\r\n                // Break the loop at a final state.\r\n                if (finalStates.Contains(currentStateId))\r\n                {\r\n                    System.Console.WriteLine(\"At a final state {0} ({1})\", currentState, currentStateId);\r\n                    break;\r\n                }\r\n            }\r\n            System.Console.WriteLine(\"Press enter to exit\");\r\n            System.Console.ReadLine();\r\n        }\r\n    }\r\n}",
    "java.bat.ejs": "echo off\r\nif defined JAVA_HOME (\r\n    REM compile\r\n    \"%JAVA_HOME%\\bin\\javac.exe\" Program.java\r\n\r\n    REM execute\r\n    \"%JAVA_HOME%\\bin\\java.exe\" Program\r\n) else (\r\n    echo \"JAVA_HOME is not defined\"\r\n)",
    "java.generated.java.ejs": "// Generated from:\r\n//\r\n//\r\n<%\r\nvar i, j,\r\n        outerIf = 'if',\r\n        innerIf = 'if',\r\n        initialStateName;\r\n\r\nfor (i = 0; i < stateMachine.states.length; i += 1) {\r\n    if (stateMachine.states[i].id === stateMachine.initialState) {\r\n        initialStateName = stateMachine.states[i].name;\r\n        break;\r\n    }\r\n}\r\n\r\n%>\r\nimport java.io.*;\r\nimport java.util.Scanner;\r\nimport java.util.List;\r\nimport java.util.ArrayList;\r\n\r\n\r\npublic class Program {\r\n\r\n    public static void main(String[] args) throws IOException {\r\n\r\n        System.out.println(\"State machine for MinimalMachine. Type 'exit' to exit the program any time.\");\r\n        Scanner scanner = new Scanner(System.in);\r\n        List<String> finalStates = new ArrayList<String>();\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>        finalStates.add(\"<%=stateMachine.finalStates[i]%>\");\r\n<%}%>\r\n\r\n        String currentStateId = \"<%=stateMachine.initialState%>\";\r\n        String currentState = \"<%=initialStateName%>\";\r\n\r\n        String currentInput = \"\";\r\n        while (currentInput.equals(\"exit\") == false) {\r\n            System.out.format(\"Current state: %s (%s)%s\", currentState, currentStateId, System.lineSeparator());\r\n            System.out.print(\"Enter an event: \");\r\n            currentInput = scanner.next();\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\ninnerIf = 'if';%>            <%=outerIf%> (currentStateId.equals(\"<%=stateMachine.states[i].id%>\"))\r\n            {\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n            var transition = stateMachine.states[i].transitions[j];\r\n            eventStr += ', ' + transition.event;\r\n%>                <%=innerIf%> (currentInput.equals(\"<%=transition.event%>\"))\r\n                {\r\n                    System.out.println(\"Switching state to <%=transition.targetName%> (<%=transition.targetId%>)\");\r\n                    currentStateId = \"<%=transition.targetId%>\";\r\n                    currentState = \"<%=transition.targetName%>\";\r\n                }<%if (j === stateMachine.states[i].transitions.length - 1) {%>\r\n                else\r\n                {\r\n                    System.out.println(\"Possible events for transition(s): <%=eventStr.substring(2)%>\");\r\n                }<%}%>\r\n<%innerIf = 'else if';}%>\r\n            }\r\n<%outerIf = 'else if';}%>\r\n            // Break the loop at a final state.\r\n            if (finalStates.contains(currentStateId)) {\r\n                System.out.format(\"At a final state %s (%s)%s\", currentState, currentStateId, System.lineSeparator());\r\n                break;\r\n            }\r\n        }\r\n\r\n        System.out.println(\"Press enter to exit\");\r\n\r\n        System.in.read();\r\n    }\r\n}",
    "javascript.bat.ejs": "echo off\r\nnode Program.js",
    "javascript.generated.js.ejs": "<%\r\nvar i, j,\r\n        outerIf = '        if',\r\n        innerIf = '            if',\r\n        initialStateName;\r\n\r\nfor (i = 0; i < stateMachine.states.length; i += 1) {\r\n    if (stateMachine.states[i].id === stateMachine.initialState) {\r\n        initialStateName = stateMachine.states[i].name;\r\n        break;\r\n    }\r\n}\r\n\r\n%>\r\nvar FSM = {};\r\n\r\n/**\r\n *\r\n * @param {function(function)} inputFn - Should invoke the callback with event data, e.g. \"readline\".\r\n * @param {function(string)} log - Out put goes here, e.g. console.log.\r\n * @param {function} exit - called when machine terminates, e.g. process.exit.\r\n */\r\nFSM.machine = function finiteStateMachine(inputFn, log, exit) {\r\n    'use strict';\r\n    var finalStates = [],\r\n        currentState = '<%=initialStateName%>',\r\n        currentStateId = '<%=stateMachine.initialState%>';\r\n\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>    finalStates.push('<%=stateMachine.finalStates[i]%>');\r\n<%}%>\r\n\r\n    log('Current state: ' + currentState + '(' + currentStateId + ')');\r\n    log('Enter an event: ');\r\n\r\n    inputFn(function (currentInput) {\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\n    innerIf = '            if';%><%=outerIf%> (currentStateId === \"<%=stateMachine.states[i].id%>\") {\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n    var transition = stateMachine.states[i].transitions[j];\r\n    eventStr += ', ' + transition.event;\r\n%><%=innerIf%> (currentInput === '<%=transition.event%>') {\r\n                log('Switching state to State1 (1)');\r\n                currentStateId = '<%=transition.targetId%>';\r\n                currentState = '<%=transition.targetName%>';\r\n            }<%if (j === stateMachine.states[i].transitions.length - 1) {%> else {\r\n                log('Possible events for transition(s): <%=eventStr.substring(2)%>');\r\n            }<%}innerIf = ' else if';}%>\r\n        }<%outerIf = ' else if';}%>\r\n\r\n        if (currentInput === 'exit') {\r\n            exit();\r\n        } else if (finalStates.indexOf(currentStateId) !== -1) {\r\n            log('At a final state ' + currentState + '(' + currentStateId + ')');\r\n            exit();\r\n        } else {\r\n            log('Current state: ' + currentState + '(' + currentStateId + ')');\r\n            log('Enter an event: ');\r\n        }\r\n    });\r\n}\r\n\r\nif (typeof window === 'undefined') {\r\n    var rl = require('readline').createInterface({\r\n            input: process.stdin,\r\n            output: process.stdout,\r\n            terminal: false\r\n        }),\r\n        cmdReader = function (callback) {\r\n            rl.on('line', callback);\r\n        };\r\n\r\n    FSM.machine(cmdReader, console.log, process.exit);\r\n} else {\r\n    FSM.Helpers = function () {\r\n        'use strict';\r\n        var self = this,\r\n            currentInput = '',\r\n            breakLoop = false;\r\n\r\n        this.log = function (str) {\r\n            currentInput += str + '\\n';\r\n        }\r\n\r\n        this.inputFn = function (callback) {\r\n            var newInput = window.prompt(currentInput);\r\n            callback(newInput);\r\n            if (breakLoop === false) {\r\n                self.inputFn(callback);\r\n            }\r\n        }\r\n        this.exit = function () {\r\n            breakLoop = true;\r\n        }\r\n    };\r\n\r\n    FSM.helpers = new FSM.Helpers();\r\n\r\n    FSM.machine(FSM.helpers.inputFn, FSM.helpers.log, FSM.helpers.exit);\r\n}\r\n",
    "python.bat.ejs": "echo off\r\npython Program.py",
    "python.generated.py.ejs": "#!/usr/bin/python\r\n<%\r\nvar i, j,\r\n        outerIf = 'if',\r\n        innerIf = 'if',\r\n        initialStateName;\r\n\r\nfor (i = 0; i < stateMachine.states.length; i += 1) {\r\n    if (stateMachine.states[i].id === stateMachine.initialState) {\r\n        initialStateName = stateMachine.states[i].name;\r\n        break;\r\n    }\r\n}\r\n\r\n%>\r\ndef main():\r\n    final_states = []\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>    final_states.append('<%=stateMachine.finalStates[i]%>')\r\n<%}%>\r\n    current_state_id = '<%=stateMachine.initialState%>'\r\n    current_state = '<%=initialStateName%>'\r\n\r\n    current_input = ''\r\n    while current_input != 'exit':\r\n        print('Current state: {0} ({1})'.format(current_state, current_state_id))\r\n        current_input = raw_input('Enter an event: ')\r\n\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\n    innerIf = 'if';%>        <%=outerIf%> current_state_id == '<%=stateMachine.states[i].id%>':\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n    var transition = stateMachine.states[i].transitions[j];\r\n    eventStr += ', ' + transition.event;\r\n%>            <%=innerIf%> current_input == '<%=transition.event%>':\r\n                print('Switching state to <%=transition.targetName%> (<%=transition.targetId%>)')\r\n                current_state_id = '<%=transition.targetId%>'\r\n                current_state = '<%=transition.targetName%>'\r\n<%if (j === stateMachine.states[i].transitions.length - 1) {%>            else:\r\n                print('Possible events for transition(s): <%=eventStr.substring(2)%>')<%}\r\ninnerIf = 'elif';}%>\r\n<%outerIf = 'elif';}%>\r\n        # Break the loop at a final state.\r\n        if current_state_id in final_states:\r\n            print('At a final state {0} ({1})'.format(current_state, current_state_id))\r\n            break\r\n\r\n    current_input = raw_input('Press enter to exit')\r\n\r\n\r\nif __name__ == '__main__':\r\n    main()",
    "ruby.bat.ejs": "echo off\r\nruby Program.rb",
    "ruby.generated.rb.ejs": "#!/usr/bin/ruby\r\n<%\r\nvar i, j,\r\n        outerIf = 'if',\r\n        innerIf = 'if',\r\n        initialStateName;\r\n\r\nfor (i = 0; i < stateMachine.states.length; i += 1) {\r\n    if (stateMachine.states[i].id === stateMachine.initialState) {\r\n        initialStateName = stateMachine.states[i].name;\r\n        break;\r\n    }\r\n}\r\n\r\n%>\r\nputs \"State machine for <%=stateMachine.name%>. Type 'exit' to exit the program any time.\"\r\n\r\nfinalStates = []\r\n<%for (i = 0; i < stateMachine.finalStates.length; i += 1) {%>finalStates << \"<%=stateMachine.finalStates[i]%>\"\r\n<%}%>\r\n\r\ncurrentStateId = \"<%=stateMachine.initialState%>\"\r\ncurrentState = \"<%=initialStateName%>\"\r\n\r\ncurrentInput = \"\"\r\nwhile currentInput != \"exit\" do\r\n    puts \"Current state: #{currentState} (#{currentStateId})\"\r\n    print \"Enter an event: \"\r\n    $stdout.flush\r\n    currentInput = gets.chomp\r\n\r\n<%for (i = 0; i < stateMachine.states.length; i += 1) {\r\n    var eventStr = '';\r\n    if (stateMachine.states[i].transitions.length === 0) {\r\n        continue;\r\n    }\r\n    innerIf = 'if';%>    <%=outerIf%> currentStateId == \"<%=stateMachine.states[i].id%>\"\r\n<%for (j = 0; j < stateMachine.states[i].transitions.length; j += 1) {\r\n    var transition = stateMachine.states[i].transitions[j];\r\n    eventStr += ', ' + transition.event;\r\n%>        <%=innerIf%> currentInput == \"<%=transition.event%>\"\r\n            puts \"Switching state to <%=transition.targetName%> (<%=transition.targetId%>)\"\r\n            currentStateId = \"<%=transition.targetId%>\"\r\n            currentState = \"<%=transition.targetName%>\"\r\n<%if (j === stateMachine.states[i].transitions.length - 1) {%>\r\n        else\r\n            puts \"Possible events for transition(s): <%=eventStr.substring(2)%>\"\r\n        end\r\n<%}\r\n    innerIf = 'elsif';\r\n}\r\nif (i === stateMachine.states.length - 1) {%>\r\n    end\r\n<%}\r\nouterIf = 'elsif';\r\n}%>\r\n    if finalStates.index(currentStateId) != nil\r\n        puts \"At final state #{currentState} (#{currentStateId})\"\r\n        break\r\n    end\r\n    \r\nend\r\n\r\nputs \"Press enter to exit\";\r\ngets.chomp"
}});