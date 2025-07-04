
import Footer from '@/components/Footer';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Welcome to Arello
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate project management platform that helps teams collaborate, organize, and achieve their goals with powerful Kanban boards and intuitive workflow management.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" className="px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
            <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Task Management</h3>
            <p className="text-muted-foreground">
              Organize your work with powerful Kanban boards and drag-and-drop functionality.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Work together seamlessly with real-time updates and team member assignments.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
            <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Workflow Automation</h3>
            <p className="text-muted-foreground">
              Streamline your processes with automated workflows and smart notifications.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
            <Target className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Goal Tracking</h3>
            <p className="text-muted-foreground">
              Monitor progress and achieve your objectives with powerful analytics and reporting.
            </p>
          </div>
        </div>

        {/* What Arello Does Section */}
        <div className="bg-card rounded-lg p-8 shadow-sm border">
          <h2 className="text-3xl font-bold text-center mb-8">What Arello Lets You Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Organize Your Projects</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Create unlimited boards for different projects and teams
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Customize columns to match your workflow stages
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Add detailed task descriptions, due dates, and attachments
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Collaborate Effectively</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Invite team members and assign tasks instantly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Comment and collaborate on tasks in real-time
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  Track progress and stay updated with notifications
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;