from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        # Create users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel')
        batman = User.objects.create(email='batman@dc.com', name='Batman', team='dc')
        spiderman = User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team='marvel')
        superman = User.objects.create(email='superman@dc.com', name='Superman', team='dc')

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30, date='2024-01-01')
        Activity.objects.create(user=batman, type='cycle', duration=45, date='2024-01-02')
        Activity.objects.create(user=spiderman, type='swim', duration=25, date='2024-01-03')
        Activity.objects.create(user=superman, type='run', duration=60, date='2024-01-04')

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 3 sets of 15 pushups', difficulty='easy')
        Workout.objects.create(name='Plank', description='Hold plank for 2 minutes', difficulty='medium')
        Workout.objects.create(name='Burpees', description='Do 20 burpees', difficulty='hard')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
