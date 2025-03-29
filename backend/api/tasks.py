from celery import shared_task
import time

@shared_task
def test_celery_task():
    print("🔁 Celery test task started...")
    time.sleep(5)
    print("✅ Celery task completed")
    return "Task Done"